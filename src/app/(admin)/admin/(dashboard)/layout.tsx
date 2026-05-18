export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <aside>
        {/* TODO: Sidebar — 세션 관리, 챌린저 관리 메뉴 + 현재 기수 정보 */}
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}
