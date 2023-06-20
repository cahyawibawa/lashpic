'use client'

import { useEffect } from 'react'
import { searchAtom } from '@/atoms'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useInView } from 'react-intersection-observer'
import { Toaster } from 'sonner'

import PhotoItem from './photo-item'
import ProductSkeleton from './photo-skeleton'
import PhotoView from './photo-view'

const API_KEY = process.env.API_KEY

const fetcher = async (page: number, query: string) => {
  if (query.length) {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&per_page=12&query=${query}&client_id=${API_KEY}`
    )
    const data = await response.json()
    return data.results
  } else {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=12&client_id=${API_KEY}`
    )
    return response.json()
  }
}

const RQPhotoList = () => {
  const { ref, inView } = useInView()
  const query = useAtomValue(searchAtom)
  const {
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    data: photos,
  } = useInfiniteQuery(
    ['photos', query],
    ({ pageParam = 1 }) => fetcher(pageParam, query),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return nextPage
      },
      getPreviousPageParam: (firstPage, allPages) => firstPage,
    }
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const renderPhotos = () => {
    if (isLoading) return <ProductSkeleton />
    if (isError) return <p>Error loading photos</p>
    if (photos.pages[0].length === 0)
      return <p className="mt-10">No photos found</p>

    return photos.pages.map((page) =>
      page.map((photo: any) => <PhotoItem key={photo.id} {...photo} />)
    )
  }

  return (
    <>
      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
        {renderPhotos()}
        <PhotoView />
      </section>
      <div ref={ref} />
      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
        {hasNextPage && photos?.pages[0].length ? <ProductSkeleton /> : ''}
      </section>
      <Toaster position="bottom-left" richColors />
    </>
  )
}

export default RQPhotoList
