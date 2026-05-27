import { HTMLAttributes, forwardRef, useState } from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const sizes: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl'
};

const statusColors = {
  online: 'bg-success',
  offline: 'bg-muted-foreground',
  busy: 'bg-destructive',
  away: 'bg-warning'
};

const statusSizes: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4'
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = '', src, alt = '', fallback, size = 'md', status, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);

    const initials = fallback || alt.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

    return (
      <div data-ev-id="ev_3ff70f6384" ref={ref} className={`relative inline-flex ${className}`} {...props}>
        <div data-ev-id="ev_48774b56e2"
        className={`
            rounded-full overflow-hidden flex items-center justify-center
            bg-gradient-to-br from-primary to-accent text-white font-medium
            ${sizes[size]}
          `}>

          {src && !imgError ?
          <img data-ev-id="ev_6d4253c0f2"
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)} /> :


          <span data-ev-id="ev_b0390aa55c">{initials}</span>
          }
        </div>
        {status &&
        <span data-ev-id="ev_ae4753b25c"
        className={`
              absolute bottom-0 right-0 rounded-full border-2 border-background
              ${statusColors[status]}
              ${statusSizes[size]}
            `} />

        }
      </div>);

  }
);

Avatar.displayName = 'Avatar';