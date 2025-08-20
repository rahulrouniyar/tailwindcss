import { Calendar, Home, Inbox, Layers, Search, Settings, Shirt, TagIcon, Tags } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const SIDEBAR_KEYBOARD_SHORTCUT = "b"

// Menu items.
const items = [
  {
    title: "Products",
    url: "/products",
    icon: Shirt,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Layers,
  },
  {
    title: "Brands",
    url: "/brands",
    icon: Tags,
  },


]

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon"> 
      <SidebarHeader>Ecommerce</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}