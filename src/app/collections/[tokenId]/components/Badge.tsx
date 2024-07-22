import { Badge } from '@/app/collections/components/ui/badge'

interface SerialBadgeProps {
  serialId: number
}

const SerialBadge: React.FC<SerialBadgeProps> = ({ serialId }) => {
  return <Badge className="bg-white border-gray-600 text-muted-foreground">{`#${serialId}`}</Badge>
}

export default SerialBadge
