import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/app/collections/components/ui/avatar'

interface TokenAvatarProps {
  url: string
  size?: string
}

const TokenAvatar: React.FC<TokenAvatarProps> = ({ url, size }) => {
  return (
    <Avatar className={size ? `h-${size} w-${size}` : undefined}>
      <AvatarImage src={url} alt='Token' />
      <AvatarFallback>TK</AvatarFallback>
    </Avatar>
  )
}

export default TokenAvatar
