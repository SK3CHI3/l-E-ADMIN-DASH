
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Plane, 
  Users, 
  CalendarDays, 
  PieChart, 
  MessageSquare,
  Settings,
  LogOut,
  Trophy,
  CreditCard
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Fleet Management",
    url: "/fleet",
    icon: Plane,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: CalendarDays,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Loyalty Points",
    url: "/loyalty",
    icon: Trophy,
  },
  {
    title: "Revenue",
    url: "/revenue",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: PieChart,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white/80 backdrop-blur-sm">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              L&E Admin
            </h1>
            <p className="text-sm text-gray-500">Luxury & Economy Car Hire</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-medium mb-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.url)}
                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 cursor-pointer ${
                      location.pathname === item.url ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className="hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
