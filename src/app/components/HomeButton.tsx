import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export default function HomeButton () {
  return (
    <Link href="/" passHref className="relative">
        <Image
          src="/Logo.png"
          alt="logo"
          width={137}
          height={50}
          priority
        />
        <Badge
          variant="default"
          className="bg-blue-500 hover:bg-blue-500 text-white absolute top-[20px] right-[-6px] transform translate-x-1/2 -translate-y-1/2 z-0"
        >
          Beta
        </Badge>
    </Link>
  )
}
