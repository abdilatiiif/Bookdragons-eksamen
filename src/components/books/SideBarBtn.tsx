import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import FilterSidebar from './FilterSidebar'

function SideBarBtn() {
  return (
    <Sidebar className="p-3">
      <SidebarContent className="mt-20 rounded-lg shadow-lg sticky">
        <SidebarTrigger className="left-2 mt-12" />
        <SidebarGroup />
        <FilterSidebar />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
export default SideBarBtn
