import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'

interface AvatarProps {
  url: string
}

const CollectionAvatar: React.FC<AvatarProps> = ({ url }) => {
  return (
      <Avatar>
        <AvatarImage src={url} alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
  )
}

export default CollectionAvatar
