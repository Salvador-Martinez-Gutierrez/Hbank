import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'

export default function CollectionAvatar ({ url }) {
  return (
      <Avatar>
        <AvatarImage src={url} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
  )
}
