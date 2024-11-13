import Link from 'next/link'
import Image from 'next/image'

export default function HomeButton () {
  return (
    <Link href="/" passHref>
        <Image
          src="/logo.png"
          alt="logo"
          width={137}
          height={50}
          priority
        />
    </Link>
  )
}
