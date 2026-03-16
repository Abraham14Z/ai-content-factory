import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  Download, 
  RotateCcw, 
  Check, 
  Save,
  Bold,
  Italic,
  List,
  Type
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export const Editor = ({ 
  content, 
  onReset,
  isGenerating 
}: { 
  content: string; 
  onReset: () => void;
  isGenerating: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (isGenerating) {
      let i = 0;
      setDisplayText('');
      const interval = setInterval(() => {
        if (i < content.length) {
          setDisplayText(prev => prev + content[i]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 5);
      return () => clearInterval(interval);
    } else {
      setDisplayText(content);
    }
  }, [content, isGenerating]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Content copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full min-h-[500px]">
      <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"><Bold className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"><Italic className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"><List className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"><Type className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onReset} className="h-8">
            <RotateCcw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto font-serif leading-relaxed text-slate-800 text-lg whitespace-pre-wrap">
        {isGenerating && displayText === '' ? (
          <div className="flex flex-col space-y-4">
            <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-slate-100 rounded animate-pulse w-5/6"></div>
          </div>
        ) : (
          displayText
        )}
      </div>

      <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <div className="flex space-x-4">
          <span>{displayText.length} characters</span>
          <span>{displayText.split(/\s+/).filter(Boolean).length} words</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="primary" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save to History
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};