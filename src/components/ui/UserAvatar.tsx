
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, UserCircle } from 'lucide-react';

type UserAvatarProps = {
  name?: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'away';
};

export function UserAvatar({
  name,
  image,
  size = 'md',
  className,
  showStatus = false,
  status = 'offline',
}: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  return (
    <div className="relative">
      <Avatar
        className={cn(
          sizeClasses[size],
          'border-2 border-background select-none transition-all',
          className
        )}
      >
        <AvatarImage src={image} alt={name || 'User'} />
        <AvatarFallback className="bg-muted">
          {name ? getInitials(name) : <UserCircle className="w-4/6 h-4/6 opacity-70" />}
        </AvatarFallback>
      </Avatar>
      
      {showStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 flex h-3 w-3 rounded-full ring-2 ring-background',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
