import { Badge } from '@/components/ui/badge'

interface SerialBadgeProps {
  serialId: string
}

const SerialBadge: React.FC<SerialBadgeProps> = ({ serialId }) => {
  return <Badge className="bg-white border-gray-600 text-muted-foreground">{`#${serialId}`}</Badge>
}

export default SerialBadge
