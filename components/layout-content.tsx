import { ReactNode } from 'react'

import Provider from './provider'
import { SiteHeader } from './site-header'

export default function LayoutContent({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <section className="container mx-auto px-4 py-2">
        <SiteHeader />
        {children}
      </section>
    </Provider>
  )
}
