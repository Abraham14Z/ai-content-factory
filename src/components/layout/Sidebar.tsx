import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PenTool, 
  History, 
  Settings, 
  Zap, 
  MessageSquare, 
  Share2, 
  Search,
  Menu,
  X,
  CreditCard,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const NavItem = ({ icon: Icon, label, active, onClick, collapsed }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 group',
      active 
        ? 'bg-indigo-600 text-white' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    )}
  >
    <Icon className={cn('w-5 h-5 min-w-[20px]', !collapsed && 'mr-3')} />
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
    {active && !collapsed && <ChevronRight className="w-4 h-4 ml-auto" />}
  </button>
);

export const Sidebar = ({ 
  activeTab, 
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'templates', label: 'Templates', icon: PenTool },
    { id: 'history', label: 'History', icon: History },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="p-6 flex items-center">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
          <Zap className="text-white w-5 h-5" />
        </div>
        {!collapsed && <span className="font-bold text-xl tracking-tight text-slate-900">AI Genius</span>}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsMobileMenuOpen(false);
            }}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className={cn(
          "bg-indigo-50 rounded-xl p-4 transition-all duration-300",
          collapsed ? "opacity-0 invisible" : "opacity-100 visible"
        )}>
          <p className="text-xs font-semibold text-indigo-600 mb-1">PRO PLAN</p>
          <p className="text-xs text-indigo-900 mb-3">Get unlimited access and early features.</p>
          <button className="w-full bg-indigo-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Upgrade Now
          </button>
        </div>
        <button className="flex items-center w-full px-3 py-2 mt-4 text-slate-600 hover:text-red-600 transition-colors group">
          <LogOut className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
          {!collapsed && <span className="text-sm font-medium">Log out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}>
        {sidebarContent}
      </aside>
    </>
  );
};