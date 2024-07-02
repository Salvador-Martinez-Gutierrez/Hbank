import { Badge } from '@/components/ui/badge'

export default function SerialBadge ({ serialId }) {
  return <Badge className="bg-white border-gray-600 text-muted-foreground">{`#${serialId}`}</Badge>
}
