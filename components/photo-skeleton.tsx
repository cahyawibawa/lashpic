import { Skeleton } from './ui/skeleton'

const ProductSkeleton = () => {
  const skeletonCount = 12
  const skeletonArray = Array.from({ length: skeletonCount }, (_, i) => (
    <Skeleton key={i} className="aspect-square rounded-lg bg-muted" />
  ))
  return <>{skeletonArray}</>
}

export default ProductSkeleton
