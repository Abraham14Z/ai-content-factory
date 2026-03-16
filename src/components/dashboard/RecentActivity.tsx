import React from 'react';
import { 
  FileText, 
  Twitter, 
  Search, 
  Mail, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';

const activities = [
  {
    id: 1,
    type: 'blog',
    title: 'Top 10 AI Trends in 2024',
    time: '2 hours ago',
    status: 'completed',
    icon: FileText,
    color: 'text-blue-500 bg-blue-50'
  },
  {
    id: 2,
    type: 'social',
    title: 'Product Launch Twitter Thread',
    time: '5 hours ago',
    status: 'completed',
    icon: Twitter,
    color: 'text-indigo-500 bg-indigo-50'
  },
  {
    id: 3,
    type: 'seo',
    title: 'Meta Description Optimization',
    time: 'Yesterday',
    status: 'completed',
    icon: Search,
    color: 'text-emerald-500 bg-emerald-50'
  },
  {
    id: 4,
    type: 'email',
    title: 'Customer Onboarding Sequence',
    time: '2 days ago',
    status: 'completed',
    icon: Mail,
    color: 'text-orange-500 bg-orange-50'
  }
];

export const RecentActivity = () => (
  <Card className="col-span-1 lg:col-span-2">
    <CardHeader className="flex flex-row items-center justify-between">
      <h3 className="font-semibold text-slate-900 text-lg">Recent Generations</h3>
      <Button variant="ghost" size="sm" className="text-indigo-600">
        View all <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </CardHeader>
    <CardContent className="p-0">
      <div className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 flex items-center hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className={`p-2 rounded-lg mr-4 ${activity.color}`}>
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                {activity.title}
              </p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-slate-500 capitalize">{activity.type}</span>
                <span className="mx-2 text-slate-300">•</span>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            </div>
            <div className="ml-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);