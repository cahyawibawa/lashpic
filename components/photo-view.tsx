import { useState } from 'react'
import Image from 'next/image'
import { atom, useAtom, useAtomValue } from 'jotai'

import BlurImage from './blur-image'
import { Dialog, DialogContent } from './ui/dialog'

export const photoViewAtom = atom({
  user: { username: '', portfolio_url: '', profile_image: { large: '' } },
  urls: { regular: '' },
})
export const openViewAtom = atom(false)

export default function PhotoView() {
  const [show, setShow] = useAtom(openViewAtom)
  const photo = useAtomValue(photoViewAtom)
  return (
    <Dialog open={show} onOpenChange={(e) => setShow(false)}>
      <DialogContent className="top-1/2 max-w-[425px] -translate-y-1/2 p-0 sm:max-w-[425px] lg:max-w-screen-md">
        <div className="relative">
          <BlurImage alt="" src={photo.urls.regular} />
          <a
            href={photo.user.portfolio_url}
            target="_blank"
            className="absolute bottom-5 left-5 min-w-[320px] rounded-lg bg-[#0F172A]/30 p-4 backdrop-blur-lg"
            rel="noreferrer"
          >
            <div className="flex items-center gap-4">
              <PhotoViewAvatar
                alt={photo.user.username}
                src={photo.user.profile_image.large}
              />
              <p className="text-base font-medium text-white">
                {photo.user.username}
              </p>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PhotoViewAvatar({ alt, src }: any) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="relative h-14 w-14 rounded-full bg-muted">
      <Image
        fill
        loading="lazy"
        className={`rounded-full object-cover duration-500 ${
          isLoading ? 'blur-md grayscale' : 'blur-0 grayscale-0'
        }`}
        onLoadingComplete={() => setLoading(false)}
        alt={alt}
        src={src}
      />
    </div>
  )
}
