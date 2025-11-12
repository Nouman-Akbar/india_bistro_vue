<template>
  <div ref="containerRef" class="relative" :style="containerStyle">
    <button
      v-if="showScreenshotButton"
      @click="captureScreenshot"
      class="absolute top-4 right-4 z-10 cursor-pointer px-4 py-2 border border-white rounded-xl bg-transparent text-white hover:bg-white hover:text-black transition-colors"
    >
      Take Screenshot
    </button>

    <div ref="canvasRef" class="w-full h-full"></div>

    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
      <div v-if="placeholderSrc" class="blur-lg rounded-lg overflow-hidden">
        <img :src="placeholderSrc" width="128" height="128" alt="Loading placeholder" />
      </div>
      <div v-else class="text-white text-xl">{{ Math.round(progress) }}%</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

interface Props {
  url: string
  width?: number
  height?: number
  modelXOffset?: number
  modelYOffset?: number
  defaultRotationX?: number
  defaultRotationY?: number
  defaultZoom?: number
  minZoomDistance?: number
  maxZoomDistance?: number
  enableMouseParallax?: boolean
  enableManualRotation?: boolean
  enableHoverRotation?: boolean
  enableManualZoom?: boolean
  ambientIntensity?: number
  keyLightIntensity?: number
  fillLightIntensity?: number
  rimLightIntensity?: number
  environmentPreset?: string
  autoFrame?: boolean
  placeholderSrc?: string
  showScreenshotButton?: boolean
  fadeIn?: boolean
  autoRotate?: boolean
  autoRotateSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 400,
  modelXOffset: 0,
  modelYOffset: 0,
  defaultRotationX: -50,
  defaultRotationY: 20,
  defaultZoom: 0.5,
  minZoomDistance: 0.5,
  maxZoomDistance: 10,
  enableMouseParallax: true,
  enableManualRotation: true,
  enableHoverRotation: true,
  enableManualZoom: true,
  ambientIntensity: 0.3,
  keyLightIntensity: 1,
  fillLightIntensity: 0.5,
  rimLightIntensity: 0.8,
  environmentPreset: 'forest',
  autoFrame: false,
  showScreenshotButton: true,
  fadeIn: false,
  autoRotate: false,
  autoRotateSpeed: 0.35
})

const emit = defineEmits<{
  (e: 'modelLoaded'): void
}>()

type MaterialWithOpacity = THREE.Material & { opacity: number; transparent: boolean }

const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLDivElement | null>(null)
const isLoading = ref(true)
const progress = ref(0)

const showScreenshotButton = computed(() => props.showScreenshotButton)
const placeholderSrc = computed(() => props.placeholderSrc)

const containerStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  touchAction: 'pan-y pinch-zoom',
  overscrollBehavior: 'contain'
}))

const deg2rad = (value: number) => (value * Math.PI) / 180
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const ROTATE_SPEED = 0.005
const INERTIA = 0.925
const PARALLAX_MAG = 0.05
const PARALLAX_EASE = 0.12
const HOVER_MAG = deg2rad(6)
const HOVER_EASE = 0.15
const clock = new THREE.Clock()

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let pmremGenerator: THREE.PMREMGenerator | null = null
let environmentTexture: THREE.Texture | null = null

let modelGroup: THREE.Group | null = null
let innerGroup: THREE.Group | null = null
let contactShadow: THREE.Mesh<THREE.PlaneGeometry, THREE.ShadowMaterial> | null = null

let ambientLight: THREE.AmbientLight | null = null
let keyLight: THREE.DirectionalLight | null = null
let fillLight: THREE.DirectionalLight | null = null
let rimLight: THREE.DirectionalLight | null = null

let animationFrameId: number | null = null
let fadeFrameId: number | null = null
let loadToken = 0

const rotationState = {
  x: deg2rad(props.defaultRotationY),
  y: deg2rad(props.defaultRotationX)
}
const velocityState = { x: 0, y: 0 }
const hoverTarget = { x: 0, y: 0 }
const hoverCurrent = { x: 0, y: 0 }
const parallaxTarget = { x: 0, y: 0 }
const parallaxCurrent = { x: 0, y: 0 }

let currentDistance = clamp(props.defaultZoom, props.minZoomDistance, props.maxZoomDistance)
const lookTarget = new THREE.Vector3(props.modelXOffset, props.modelYOffset, 0)

const mouseDragState = { active: false, lastX: 0, lastY: 0 }
const touchState = {
  isRotating: false,
  lastX: 0,
  lastY: 0,
  isPinching: false,
  startDistance: 0,
  startZoom: currentDistance
}

const resetRotation = () => {
  rotationState.x = deg2rad(props.defaultRotationY)
  rotationState.y = deg2rad(props.defaultRotationX)
  velocityState.x = 0
  velocityState.y = 0
  if (modelGroup) {
    modelGroup.rotation.set(rotationState.x, rotationState.y, 0)
  }
}

const updateLookTarget = () => {
  lookTarget.set(props.modelXOffset, props.modelYOffset, 0)
}

const setCameraDistance = (distance: number, updateStartZoom = true) => {
  if (!camera) return
  currentDistance = clamp(distance, props.minZoomDistance, props.maxZoomDistance)
  camera.position.set(0, 0, currentDistance)
  if (updateStartZoom) {
    touchState.startZoom = currentDistance
  }
}

const finalizeLoadingState = (token: number) => {
  if (token !== loadToken) return
  isLoading.value = false
  if (progress.value < 100) {
    progress.value = 100
  }
}

const signalModelLoaded = (token: number) => {
  finalizeLoadingState(token)
  if (token === loadToken) {
    emit('modelLoaded')
  }
}

const cancelFade = () => {
  if (fadeFrameId !== null) {
    cancelAnimationFrame(fadeFrameId)
    fadeFrameId = null
  }
}

const disposeMaterial = (material: THREE.Material | THREE.Material[] | undefined) => {
  if (!material) return
  if (Array.isArray(material)) {
    material.forEach(item => disposeMaterial(item))
    return
  }
  material.dispose()
}

const disposeObject = (object: THREE.Object3D) => {
  object.traverse(child => {
    const mesh = child as THREE.Mesh
    if (mesh.isMesh) {
      mesh.geometry.dispose()
      disposeMaterial(mesh.material)
    }
  })
}

const disposeModel = () => {
  if (!innerGroup) return
  while (innerGroup.children.length) {
    const child = innerGroup.children.pop()
    if (child) {
      innerGroup.remove(child)
      disposeObject(child)
    }
  }
}

const startFade = (materials: MaterialWithOpacity[], token: number) => {
  const activeRenderer = renderer
  const activeScene = scene
  const activeCamera = camera
  if (!activeRenderer || !activeScene || !activeCamera) {
    signalModelLoaded(token)
    return
  }

  cancelFade()
  const start = performance.now()
  const duration = 600

  const fadeStep = () => {
    if (token !== loadToken) {
      fadeFrameId = null
      return
    }
    const elapsed = performance.now() - start
    const alpha = Math.min(elapsed / duration, 1)

    materials.forEach(mat => {
      mat.opacity = alpha
      mat.needsUpdate = true
    })

    activeRenderer.render(activeScene, activeCamera)

    if (alpha < 1) {
      fadeFrameId = requestAnimationFrame(fadeStep)
    } else {
      fadeFrameId = null
      signalModelLoaded(token)
    }
  }

  fadeFrameId = requestAnimationFrame(fadeStep)
}

const applyEnvironmentPreset = () => {
  if (!scene || !pmremGenerator) return

  if (environmentTexture) {
    environmentTexture.dispose()
    environmentTexture = null
  }

  if (props.environmentPreset === 'none') {
    scene.environment = null
    return
  }

  const envScene = new RoomEnvironment()
  environmentTexture = pmremGenerator.fromScene(envScene, 0.04).texture
  scene.environment = environmentTexture
}

const setupLights = () => {
  if (!scene) return

  ambientLight = new THREE.AmbientLight(0xffffff, props.ambientIntensity)
  scene.add(ambientLight)

  keyLight = new THREE.DirectionalLight(0xffffff, props.keyLightIntensity)
  keyLight.position.set(5, 5, 5)
  keyLight.castShadow = true
  keyLight.shadow.mapSize.set(1024, 1024)
  keyLight.shadow.bias = -0.0005
  scene.add(keyLight)

  fillLight = new THREE.DirectionalLight(0xffffff, props.fillLightIntensity)
  fillLight.position.set(-5, 2, 5)
  scene.add(fillLight)

  rimLight = new THREE.DirectionalLight(0xffffff, props.rimLightIntensity)
  rimLight.position.set(0, 4, -5)
  scene.add(rimLight)
}

const setupContactShadow = () => {
  if (!scene) return

  const geometry = new THREE.PlaneGeometry(10, 10)
  const material = new THREE.ShadowMaterial({ opacity: 0.35 })
  contactShadow = new THREE.Mesh(geometry, material)
  contactShadow.rotation.x = -Math.PI / 2
  contactShadow.position.set(0, -0.5, 0)
  contactShadow.receiveShadow = true
  scene.add(contactShadow)
}

const buildFallbackModel = () => {
  if (!innerGroup) return

  disposeModel()
  const geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 128, 32)
  const material = new THREE.MeshStandardMaterial({ color: 0xff7744, metalness: 0.25, roughness: 0.6 })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  mesh.receiveShadow = true
  innerGroup.add(mesh)

  resetRotation()
  setCameraDistance(currentDistance)
  if (scene && camera && renderer) {
    renderer.render(scene, camera)
  }
}

const prepareModelObject = (object: THREE.Object3D): MaterialWithOpacity[] => {
  const fadeMaterials: MaterialWithOpacity[] = []

  object.traverse(child => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh) return

    mesh.castShadow = true
    mesh.receiveShadow = true

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    materials.forEach(material => {
      if (!material) return
      const typed = material as MaterialWithOpacity
      if (props.fadeIn) {
        typed.transparent = true
        typed.opacity = 0
        fadeMaterials.push(typed)
      }
    })
  })

  return fadeMaterials
}

const handleGlobalPointerMove = (event: PointerEvent) => {
  if (event.pointerType !== 'mouse') return

  const nx = (event.clientX / window.innerWidth) * 2 - 1
  const ny = (event.clientY / window.innerHeight) * 2 - 1

  if (props.enableMouseParallax) {
    parallaxTarget.x = -nx * PARALLAX_MAG
    parallaxTarget.y = -ny * PARALLAX_MAG
  } else {
    parallaxTarget.x = 0
    parallaxTarget.y = 0
  }

  if (props.enableHoverRotation) {
    hoverTarget.x = ny * HOVER_MAG
    hoverTarget.y = nx * HOVER_MAG
  } else {
    hoverTarget.x = 0
    hoverTarget.y = 0
  }
}

const handlePointerDown = (event: PointerEvent) => {
  if (!props.enableManualRotation) return
  if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return

  event.preventDefault()
  mouseDragState.active = true
  mouseDragState.lastX = event.clientX
  mouseDragState.lastY = event.clientY
}

const handlePointerMoveCanvas = (event: PointerEvent) => {
  if (!props.enableManualRotation) return
  if (!mouseDragState.active) return
  if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return

  const dx = event.clientX - mouseDragState.lastX
  const dy = event.clientY - mouseDragState.lastY
  mouseDragState.lastX = event.clientX
  mouseDragState.lastY = event.clientY

  rotationState.y += dx * ROTATE_SPEED
  rotationState.x += dy * ROTATE_SPEED
  velocityState.x = dx * ROTATE_SPEED
  velocityState.y = dy * ROTATE_SPEED
}

const handlePointerUp = () => {
  mouseDragState.active = false
}

const handleWheel = (event: WheelEvent) => {
  if (!props.enableManualZoom) return
  event.preventDefault()
  event.stopPropagation()

  const delta = event.deltaY * 0.002
  setCameraDistance(currentDistance + delta)
}

const getTouchDistance = (touches: TouchList) => {
  if (touches.length < 2) return 0
  const a = touches[0]
  const b = touches[1]
  const dx = a.clientX - b.clientX
  const dy = a.clientY - b.clientY
  return Math.hypot(dx, dy)
}

const handleTouchStart = (event: TouchEvent) => {
  if (event.touches.length === 1 && props.enableManualRotation) {
    touchState.isRotating = true
    touchState.lastX = event.touches[0].clientX
    touchState.lastY = event.touches[0].clientY
  } else if (event.touches.length === 2 && props.enableManualZoom) {
    touchState.isPinching = true
    touchState.startDistance = getTouchDistance(event.touches)
    touchState.startZoom = currentDistance
  }
}

const handleTouchMove = (event: TouchEvent) => {
  if (touchState.isRotating && event.touches.length === 1 && props.enableManualRotation) {
    event.preventDefault()
    const touch = event.touches[0]
    const dx = touch.clientX - touchState.lastX
    const dy = touch.clientY - touchState.lastY
    touchState.lastX = touch.clientX
    touchState.lastY = touch.clientY

    rotationState.y += dx * ROTATE_SPEED
    rotationState.x += dy * ROTATE_SPEED
    velocityState.x = dx * ROTATE_SPEED
    velocityState.y = dy * ROTATE_SPEED
  } else if (touchState.isPinching && event.touches.length === 2 && props.enableManualZoom) {
    event.preventDefault()
    const distance = getTouchDistance(event.touches)
    const delta = touchState.startDistance - distance
    const zoomDelta = delta * 0.005
    setCameraDistance(touchState.startZoom + zoomDelta, false)
  }
}

const handleTouchEnd = (event: TouchEvent) => {
  if (event.touches.length === 0) {
    touchState.isRotating = false
    touchState.isPinching = false
  } else if (event.touches.length === 1 && props.enableManualRotation) {
    touchState.isPinching = false
    touchState.isRotating = true
    touchState.lastX = event.touches[0].clientX
    touchState.lastY = event.touches[0].clientY
  } else {
    touchState.isRotating = false
    touchState.isPinching = false
  }
}

const handleBlur = () => {
  mouseDragState.active = false
  touchState.isRotating = false
  touchState.isPinching = false
}

const addEventListeners = () => {
  if (!renderer) return
  const canvas = renderer.domElement

  canvas.addEventListener('pointerdown', handlePointerDown)
  canvas.addEventListener('pointermove', handlePointerMoveCanvas)
  canvas.addEventListener('wheel', handleWheel, { passive: false })
  containerRef.value?.addEventListener('wheel', handleWheel, { passive: false })

  canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
  canvas.addEventListener('touchend', handleTouchEnd)
  canvas.addEventListener('touchcancel', handleTouchEnd)

  window.addEventListener('pointerup', handlePointerUp)
  window.addEventListener('pointermove', handleGlobalPointerMove)
  window.addEventListener('blur', handleBlur)
}

const removeEventListeners = () => {
  if (!renderer) return
  const canvas = renderer.domElement

  canvas.removeEventListener('pointerdown', handlePointerDown)
  canvas.removeEventListener('pointermove', handlePointerMoveCanvas)
  canvas.removeEventListener('wheel', handleWheel)
  containerRef.value?.removeEventListener('wheel', handleWheel)

  canvas.removeEventListener('touchstart', handleTouchStart)
  canvas.removeEventListener('touchmove', handleTouchMove)
  canvas.removeEventListener('touchend', handleTouchEnd)
  canvas.removeEventListener('touchcancel', handleTouchEnd)

  window.removeEventListener('pointerup', handlePointerUp)
  window.removeEventListener('pointermove', handleGlobalPointerMove)
  window.removeEventListener('blur', handleBlur)
}

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)
  if (!renderer || !scene || !camera || !modelGroup) return

  const delta = clock.getDelta()

  hoverCurrent.x += (hoverTarget.x - hoverCurrent.x) * HOVER_EASE
  hoverCurrent.y += (hoverTarget.y - hoverCurrent.y) * HOVER_EASE

  parallaxCurrent.x += (parallaxTarget.x - parallaxCurrent.x) * PARALLAX_EASE
  parallaxCurrent.y += (parallaxTarget.y - parallaxCurrent.y) * PARALLAX_EASE

  rotationState.y += velocityState.x
  rotationState.x += velocityState.y

  velocityState.x *= INERTIA
  velocityState.y *= INERTIA

  if (props.autoRotate) {
    rotationState.y += props.autoRotateSpeed * delta
  }

  modelGroup.rotation.x = rotationState.x + hoverCurrent.x
  modelGroup.rotation.y = rotationState.y + hoverCurrent.y

  modelGroup.position.set(props.modelXOffset + parallaxCurrent.x, props.modelYOffset + parallaxCurrent.y, 0)

  if (contactShadow) {
    contactShadow.position.x = modelGroup.position.x
    contactShadow.position.z = modelGroup.position.z
    contactShadow.position.y = modelGroup.position.y - 0.5
  }

  lookTarget.copy(modelGroup.position)
  camera.lookAt(lookTarget)

  renderer.render(scene, camera)
}

const stopAnimation = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const loadModel = async (modelUrl: string) => {
  if (!innerGroup || !modelGroup) return

  const token = ++loadToken
  cancelFade()
  isLoading.value = true
  progress.value = 0

  disposeModel()

  velocityState.x = 0
  velocityState.y = 0
  hoverTarget.x = 0
  hoverTarget.y = 0
  hoverCurrent.x = 0
  hoverCurrent.y = 0
  parallaxTarget.x = 0
  parallaxTarget.y = 0
  parallaxCurrent.x = 0
  parallaxCurrent.y = 0
  mouseDragState.active = false
  touchState.isRotating = false
  touchState.isPinching = false

  if (!modelUrl) {
    console.warn('ModelViewer: no model URL provided. Rendering fallback geometry instead.')
    buildFallbackModel()
    signalModelLoaded(token)
    return
  }

  const onProgress = (event: ProgressEvent<EventTarget>) => {
    if (event.lengthComputable && event.total > 0) {
      progress.value = (event.loaded / event.total) * 100
    }
  }

  const lower = modelUrl.toLowerCase()

  let object: THREE.Object3D | null = null

  try {
    if (lower.endsWith('.glb') || lower.endsWith('.gltf')) {
      const loader = new GLTFLoader()
      loader.setCrossOrigin('anonymous')
      const gltf = await loader.loadAsync(modelUrl, onProgress)
      object = gltf.scene.clone(true)
    } else if (lower.endsWith('.fbx')) {
      const loader = new FBXLoader()
      loader.setCrossOrigin?.('anonymous')
      const group = await loader.loadAsync(modelUrl, onProgress)
      object = group.clone(true)
    } else if (lower.endsWith('.obj')) {
      const loader = new OBJLoader()
      loader.setCrossOrigin?.('anonymous')
      const group = await loader.loadAsync(modelUrl, onProgress)
      object = group.clone(true)
    } else {
      throw new Error(`Unsupported model format: ${modelUrl}`)
    }
  } catch (error) {
    console.error('ModelViewer: failed to load model', error)
    if (token !== loadToken) return
    buildFallbackModel()
    signalModelLoaded(token)
    return
  }

  if (!object || token !== loadToken) {
    if (object) disposeObject(object)
    return
  }

  const fadeMaterials = prepareModelObject(object)

  const boundingBox = new THREE.Box3().setFromObject(object)
  const sphere = boundingBox.getBoundingSphere(new THREE.Sphere())
  let fitRadius = 0.5

  if (sphere.radius > 0) {
    const scale = 1 / (sphere.radius * 2)
    object.position.sub(sphere.center)
    object.scale.setScalar(scale)
    fitRadius = sphere.radius * scale
  } else {
    object.scale.setScalar(1)
  }

  innerGroup.add(object)
  resetRotation()

  if (camera) {
    const fov = THREE.MathUtils.degToRad(camera.fov)
    const distance = props.autoFrame ? (fitRadius * 1.2) / Math.sin(fov / 2) : props.defaultZoom
    setCameraDistance(distance)
    camera.near = currentDistance / 10
    camera.far = currentDistance * 10
    camera.updateProjectionMatrix()
  }

  if (scene && camera && renderer) {
    renderer.render(scene, camera)
  }

  if (props.fadeIn && fadeMaterials.length > 0) {
    startFade(fadeMaterials, token)
  } else {
    signalModelLoaded(token)
  }
}

const captureScreenshot = () => {
  if (!renderer || !scene || !camera) return

  const previousShadow = renderer.shadowMap.enabled
  renderer.shadowMap.enabled = false

  const lightStates: Array<{ light: THREE.Light & { castShadow?: boolean }; castShadow: boolean }> = []
  scene.traverse(object => {
    const anyObject = object as THREE.Light & { castShadow?: boolean }
    if ((anyObject as any).isLight && typeof anyObject.castShadow === 'boolean') {
      lightStates.push({ light: anyObject, castShadow: anyObject.castShadow })
      anyObject.castShadow = false
    }
  })

  const contactVisible = contactShadow ? contactShadow.visible : false
  if (contactShadow) contactShadow.visible = false

  renderer.render(scene, camera)

  const dataURL = renderer.domElement.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = 'model.png'
  link.href = dataURL
  link.click()

  lightStates.forEach(({ light, castShadow }) => {
    light.castShadow = castShadow
  })

  if (contactShadow) contactShadow.visible = contactVisible
  renderer.shadowMap.enabled = previousShadow
}

const initScene = () => {
  if (renderer || !canvasRef.value) return

  scene = new THREE.Scene()
  scene.background = null

  const aspect = props.width / props.height
  camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 100)
  setCameraDistance(currentDistance, false)
  updateLookTarget()
  camera.lookAt(lookTarget)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.setPixelRatio(window.devicePixelRatio || 1)
  renderer.setSize(props.width, props.height)
  canvasRef.value.appendChild(renderer.domElement)

  pmremGenerator = new THREE.PMREMGenerator(renderer)

  modelGroup = new THREE.Group()
  innerGroup = new THREE.Group()
  modelGroup.add(innerGroup)
  scene.add(modelGroup)

  setupLights()
  setupContactShadow()
  applyEnvironmentPreset()
  addEventListeners()
  animate()
  loadModel(props.url)
}

watch(
  () => props.url,
  newUrl => {
    if (renderer && scene) loadModel(newUrl)
  }
)

watch(
  () => [props.width, props.height],
  ([width, height]) => {
    if (!renderer || !camera) return
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
)

watch(
  () => props.defaultZoom,
  value => {
    setCameraDistance(value)
  }
)

watch(
  () => [props.minZoomDistance, props.maxZoomDistance],
  () => {
    setCameraDistance(currentDistance, false)
  }
)

watch(
  () => [props.defaultRotationX, props.defaultRotationY],
  () => {
    resetRotation()
  }
)

watch(
  () => [props.modelXOffset, props.modelYOffset],
  () => {
    updateLookTarget()
  }
)

watch(
  () => props.environmentPreset,
  () => applyEnvironmentPreset()
)

watch(
  () => props.ambientIntensity,
  value => {
    if (ambientLight) ambientLight.intensity = value
  }
)

watch(
  () => props.keyLightIntensity,
  value => {
    if (keyLight) keyLight.intensity = value
  }
)

watch(
  () => props.fillLightIntensity,
  value => {
    if (fillLight) fillLight.intensity = value
  }
)

watch(
  () => props.rimLightIntensity,
  value => {
    if (rimLight) rimLight.intensity = value
  }
)

onMounted(() => {
  initScene()
})

onUnmounted(() => {
  removeEventListeners()
  stopAnimation()
  cancelFade()

  disposeModel()

  if (contactShadow) {
    contactShadow.geometry.dispose()
    contactShadow.material.dispose()
    contactShadow = null
  }

  if (environmentTexture) {
    environmentTexture.dispose()
    environmentTexture = null
  }

  pmremGenerator?.dispose()
  pmremGenerator = null

  renderer?.dispose()
  if (renderer && canvasRef.value && renderer.domElement.parentElement === canvasRef.value) {
    canvasRef.value.removeChild(renderer.domElement)
  }
  renderer = null

  scene = null
  camera = null
  modelGroup = null
  innerGroup = null
})
</script>

<style scoped>
* {
  backface-visibility: hidden;
}
</style>
