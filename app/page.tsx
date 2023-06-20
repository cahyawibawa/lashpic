import { buttonVariants } from '@/components/ui/button'
import RQPhotoList from '@/components/photo-list'
import QueryProvider from '@/components/query-provider'
import ScrollToTop from '@/components/scroll-top'
import Search from '@/components/search'

export default function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          {/* <a
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
            href="https://twitter.com/shadcn"
            rel="noreferrer"
          >
            Follow along on Twitter
          </a> */}
          <h1 className="text-3xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
            Search photos around the world with Splasearcy
          </h1>
          <p className="max-w-[42rem] pb-8 leading-normal text-muted-foreground sm:text-xl sm:leading-8 ">
            Splasearcy is a free stock photo search engine that helps you find
            the perfect photo for your project.
          </p>
          {/* <a
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
            href="https://github.com/"
          >
            GitHub
          </a> */}
          <Search />
        </div>
      </section>

      <QueryProvider>
        <RQPhotoList />
      </QueryProvider>
      <ScrollToTop />
    </>
  )
}
