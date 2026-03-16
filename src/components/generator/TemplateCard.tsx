import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  color: string;
  onClick: () => void;
}

export const TemplateCard = ({ title, description, icon: Icon, image, color, onClick }: TemplateCardProps) => (
  <Card 
    className="group cursor-pointer hover:border-indigo-500 transition-all hover:shadow-lg overflow-hidden flex flex-col h-full"
    onClick={onClick}
  >
    <div className="h-40 relative overflow-hidden">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className={cn("absolute bottom-3 left-3 p-2 rounded-lg text-white", color)}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <CardContent className="p-5 flex-1 flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-sm text-slate-500 line-clamp-2">{description}</p>
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-indigo-600 text-sm font-semibold">
        Start Creating
        <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </CardContent>
  </Card>
);