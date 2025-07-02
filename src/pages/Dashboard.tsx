import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MetricsCards } from '@/components/MetricsCards';
import { ChartsSection } from '@/components/ChartsSection';
import { RecentActivity } from '@/components/RecentActivity';
import { QuickStats } from '@/components/QuickStats';

const Dashboard = () => {
  console.log('Dashboard component rendered');
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <DashboardHeader />
          <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
            <div>
              <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
              <MetricsCards />
            </div>
            <ChartsSection />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
              <div className="lg:col-span-1">
                <QuickStats />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
