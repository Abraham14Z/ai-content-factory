import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
}

export const StatsCard = ({ label, value, change, icon: Icon, trend }: StatsCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          trend === 'up' ? "bg-emerald-50 text-emerald-600" : 
          trend === 'down' ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600"
        )}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </CardContent>
  </Card>
);