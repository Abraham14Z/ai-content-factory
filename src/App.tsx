import React, { useState } from 'react';
import { 
  FileText, 
  Twitter, 
  Search, 
  Mail, 
  Users, 
  TrendingUp, 
  Calendar,
  Sparkles,
  ArrowLeft,
  LayoutDashboard,
  PenTool,
  History as HistoryIcon,
  Settings,
  CreditCard,
  LogOut
} from 'lucide-react';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { StatsCard } from './components/dashboard/StatsCard';
import { RecentActivity } from './components/dashboard/RecentActivity';
import { TemplateCard } from './components/generator/TemplateCard';
import { Editor } from './components/generator/Editor';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardContent } from './components/ui/card';
import { cn } from './lib/utils';

const TEMPLATES = [
  {
    id: 'blog',
    title: 'Blog Post Generator',
    description: 'Create SEO-optimized blog posts with catchy titles and engaging introductions.',
    icon: FileText,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/32f6ad1e-c515-4449-9f1b-eb5955ba19f1/blog-template-icon-7438d4b5-1773568959717.webp',
    color: 'bg-blue-600',
    fields: [
      { id: 'topic', label: 'What is your blog about?', type: 'text', placeholder: 'e.g. Benefits of Remote Work' },
      { id: 'keywords', label: 'Keywords (comma separated)', type: 'text', placeholder: 'productivity, culture, tech' },
      { id: 'tone', label: 'Tone of Voice', type: 'select', options: ['Professional', 'Casual', 'Witty', 'Informative'] }
    ]
  },
  {
    id: 'social',
    title: 'Social Media Manager',
    description: 'Generate viral Twitter threads, Instagram captions, and LinkedIn updates in seconds.',
    icon: Twitter,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/32f6ad1e-c515-4449-9f1b-eb5955ba19f1/social-media-template-icon-81e1dc37-1773568959973.webp',
    color: 'bg-indigo-600',
    fields: [
      { id: 'platform', label: 'Platform', type: 'select', options: ['Twitter', 'LinkedIn', 'Instagram', 'Facebook'] },
      { id: 'context', label: 'What are you sharing?', type: 'textarea', placeholder: 'e.g. My new project launch...' },
      { id: 'goal', label: 'Goal', type: 'select', options: ['Engagement', 'Sales', 'Education'] }
    ]
  },
  {
    id: 'seo',
    title: 'SEO Optimizer',
    description: 'Write perfect meta descriptions, title tags, and alt text to boost your search rankings.',
    icon: Search,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/32f6ad1e-c515-4449-9f1b-eb5955ba19f1/seo-template-icon-65644e0e-1773568967256.webp',
    color: 'bg-emerald-600',
    fields: [
      { id: 'url', label: 'Page URL / Title', type: 'text', placeholder: 'https://mywebsite.com/ai-tool' },
      { id: 'primary_keyword', label: 'Primary Keyword', type: 'text', placeholder: 'AI Content Generator' },
      { id: 'target_audience', label: 'Target Audience', type: 'text', placeholder: 'Content Creators' }
    ]
  },
  {
    id: 'email',
    title: 'Email Drafter',
    description: 'Professional cold emails, newsletters, and follow-ups that actually get replies.',
    icon: Mail,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/32f6ad1e-c515-4449-9f1b-eb5955ba19f1/email-template-icon-e431ac52-1773568967715.webp',
    color: 'bg-orange-600',
    fields: [
      { id: 'recipient', label: 'Who is this for?', type: 'text', placeholder: 'Potential Client' },
      { id: 'subject', label: 'Main Point', type: 'text', placeholder: 'Collaboration Opportunity' },
      { id: 'length', label: 'Length', type: 'select', options: ['Short', 'Medium', 'Detailed'] }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  
  const handleGenerate = () => {
    if (!selectedTemplate) return;
    setIsGenerating(true);
    setGeneratedContent('');
    
    // Simulate AI Generation
    setTimeout(() => {
      const mockResponses: Record<string, string> = {
        blog: `# The Future of Content Creation with AI

Artificial Intelligence is no longer a futuristic concept; it is a present-day reality that is transforming how we create, consume, and distribute content. 

## Why AI Matters
In today's fast-paced digital world, the demand for high-quality content is higher than ever. Content creators are constantly looking for ways to streamline their workflows without compromising on quality.

### Key Benefits:
1. **Efficiency**: AI can draft articles in seconds.
2. **Consistency**: Maintain a steady output of content.
3. **Optimization**: Built-in SEO checks and keyword integration.

Conclusion...
AI is a tool that enhances human creativity, not replaces it. By leveraging these technologies, creators can focus on strategy and storytelling.`,
        social: `🚀 Just launched my new AI-powered content generator! 

Stop spending hours staring at a blank screen. My tool helps you:
- Write blogs 10x faster
- Create viral social posts
- Optimize for SEO automatically

Check it out at aigenius.app 🔗

#AI #SaaS #BuildInPublic #Tech`,
        seo: `Title Tag: AI Content Generator | Create High-Quality Posts in Seconds

Meta Description: Boost your productivity with AI Genius. The all-in-one AI content generation tool for blogs, social media, and SEO. Try it for free today and transform your writing process.`,
        email: `Subject: Quick Question regarding your content strategy

Hi [Name],

I've been following your work at [Company] and was impressed by your recent series on remote work.

I'm reaching out because I've built a tool that helps teams like yours scale their content production by 300% using AI, while keeping the human touch. 

Would you be open to a 10-minute chat next Tuesday to see how this might fit into your workflow?

Best,
John`
      };
      
      setGeneratedContent(mockResponses[selectedTemplate.id] || "Content generated successfully!");
      setIsGenerating(false);
    }, 1500);
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Words Generated" value="124,500" change="+12.5%" trend="up" icon={FileText} />
        <StatsCard label="Active Templates" value="18" change="Stable" trend="neutral" icon={Sparkles} />
        <StatsCard label="Credits Used" value="842" change="-20%" trend="down" icon={TrendingUp} />
        <StatsCard label="Time Saved" value="48 hrs" change="+5 hrs" trend="up" icon={Calendar} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RecentActivity />
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-slate-900">Your Usage</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium">Credits Used</span>
                  <span className="text-slate-900 font-bold">842 / 1000</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '84.2%' }}></div>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                You have 158 credits remaining. Credits reset on June 1st, 2024.
              </p>
              <Button variant="outline" size="sm" className="w-full">Manage Subscription</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
      {TEMPLATES.map((template) => (
        <TemplateCard 
          key={template.id}
          {...template}
          onClick={() => setSelectedTemplate(template)}
        />
      ))}
    </div>
  );

  const renderGenerator = () => {
    if (!selectedTemplate) return null;

    return (
      <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
        <Button 
          variant="ghost" 
          onClick={() => {
            setSelectedTemplate(null);
            setGeneratedContent('');
          }}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Templates
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className={cn("p-2 rounded-lg text-white", selectedTemplate.color)}>
                  <selectedTemplate.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedTemplate.title}</h2>
                  <p className="text-sm text-slate-500">Fill in the details below to generate content.</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {selectedTemplate.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">{field.label}</label>
                    {field.type === 'select' ? (
                      <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                        {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea 
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[100px]"
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input 
                        type="text"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
                <Button 
                  className="w-full h-12 text-lg" 
                  onClick={handleGenerate}
                  isLoading={isGenerating}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Content
                </Button>
              </CardContent>
            </Card>

            <div className="bg-indigo-900 rounded-xl p-6 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-bold mb-2">Pro Tip 💡</h4>
                <p className="text-sm text-indigo-100/80 leading-relaxed">
                  Be as specific as possible in your topic description. Mentioning target keywords and audience will result in much more relevant content.
                </p>
              </div>
              <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 transform rotate-12 group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>

          <div className="lg:h-[calc(100vh-200px)] flex flex-col">
            {generatedContent || isGenerating ? (
              <Editor 
                content={generatedContent} 
                isGenerating={isGenerating}
                onReset={() => setGeneratedContent('')} 
              />
            ) : (
              <div className="flex-1 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-8 bg-slate-50/50">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <PenTool className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Content Yet</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Fill in the form and click generate to see the magic happen right here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Toaster position="top-right" />
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedTemplate(null);
        }}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300">
        <Header 
          activeTab={selectedTemplate ? selectedTemplate.title : activeTab} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {selectedTemplate ? (
            renderGenerator()
          ) : (
            <>
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'templates' && renderTemplates()}
              {activeTab === 'history' && (
                <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                  <HistoryIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-slate-900">No History</h2>
                  <p className="text-slate-500">You haven't generated any content yet.</p>
                  <Button className="mt-6" onClick={() => setActiveTab('templates')}>Start Creating</Button>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <Card>
                    <CardHeader>
                      <h2 className="text-xl font-bold">General Settings</h2>
                    </CardHeader>
                    <CardContent>
                      <p>Settings content goes here...</p>
                    </CardContent>
                  </Card>
                </div>
              )}
              {activeTab === 'billing' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <Card>
                    <CardHeader>
                      <h2 className="text-xl font-bold">Current Subscription</h2>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold">Pro Plan - $29/mo</p>
                          <p className="text-sm text-slate-500">Your next billing date is June 12, 2024</p>
                        </div>
                        <Button variant="outline">Update Payment Method</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}