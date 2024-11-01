import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/app/collections/components/ui/avatar'

interface AvatarProps {
  url: string
}

const CollectionAvatar: React.FC<AvatarProps> = ({ url }) => {
  return (
      <Avatar>
        <AvatarImage src={url} alt={url} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
  )
}

export default CollectionAvatar
