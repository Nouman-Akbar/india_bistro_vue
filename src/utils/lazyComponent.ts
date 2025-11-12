import type { AsyncComponentLoader, Component } from 'vue'
import { defineAsyncComponent } from 'vue'

/**
 * Shared helper for lazily loaded components with retry logic
 * and no Suspense requirement.
 */
export const createLazyComponent = <T extends Component>(
  loader: AsyncComponentLoader<T>
) =>
  defineAsyncComponent({
    loader,
    suspensible: false,
    delay: 120,
    onError(error, retry, fail, attempts) {
      if (attempts <= 2) {
        retry()
      } else {
        fail(error)
      }
    }
  })
