import { HTMLAttributes, forwardRef } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = '', variant = 'rectangular', width, height, style, ...props }, ref) => {
    const variants = {
      text: 'rounded h-4',
      circular: 'rounded-full',
      rectangular: '',
      rounded: 'rounded-lg'
    };

    return (
      <div data-ev-id="ev_96423505fd"
      ref={ref}
      className={`animate-shimmer ${variants[variant]} ${className}`}
      style={{
        width: width,
        height: height,
        ...style
      }}
      {...props} />);


  }
);

Skeleton.displayName = 'Skeleton';

export function SkeletonCard() {
  return (
    <div data-ev-id="ev_6b00783e81" className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3">
      <Skeleton variant="rounded" className="w-full h-40" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <div data-ev-id="ev_447dfe5999" className="flex gap-2 mt-2">
        <Skeleton variant="rounded" className="w-16 h-6" />
        <Skeleton variant="rounded" className="w-16 h-6" />
      </div>
    </div>);

}

export function SkeletonList({ count = 3 }: {count?: number;}) {
  return (
    <div data-ev-id="ev_8639155096" className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) =>
      <div data-ev-id="ev_d504787d77" key={i} className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl">
          <Skeleton variant="rounded" className="w-16 h-16 flex-shrink-0" />
          <div data-ev-id="ev_916b5bbbe8" className="flex-1 flex flex-col gap-2">
            <Skeleton variant="text" className="w-1/3" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
          <Skeleton variant="rounded" className="w-20 h-8" />
        </div>
      )}
    </div>);

}