import SideNav from './components/SideNav'

interface LayoutProps {
  children: React.ReactNode
  params: {
    accountId: string
  }
}

export default function Layout ({ children, params }: LayoutProps) {
  return (
    <div className="bg-neutral-900 flex flex-col md:flex-row w-full">
      <div className="hidden md:block">
        <SideNav accountId={params.accountId} />
      </div>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
