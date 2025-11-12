export type RouteNavLink = {
  label: string
  name: string
}

export type ExternalNavLink = {
  label: string
  href: string
}

const routeMap = {
  about: { label: 'About Us', name: 'about' },
  gallery: { label: 'Gallery', name: 'gallery' },
  menu: { label: 'Menu', name: 'menu' },
  reservations: { label: 'Reservations', name: 'reservations' },
  careers: { label: 'Careers', name: 'careers' },
  blog: { label: 'Blog', name: 'blog' },
  contact: { label: 'Contact Us', name: 'contact' }
} as const satisfies Record<string, RouteNavLink>

export const headerNavigation: RouteNavLink[] = [
  routeMap.about,
  routeMap.gallery,
  routeMap.menu,
  { label: 'Private Dining', name: routeMap.reservations.name },
  routeMap.careers,
  routeMap.blog,
  routeMap.contact
]

export const footerNavigation: Array<RouteNavLink | ExternalNavLink> = [
  routeMap.menu,
  routeMap.reservations,
  routeMap.careers,
  routeMap.blog,
  routeMap.contact,
  { label: 'Follow Us', href: '#' },
  { label: 'Privacy Policy', href: '#' }
]
