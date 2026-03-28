'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Cpu, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

const COST_DATA = [
  { name: 'Mon', cost: 12.5 },
  { name: 'Tue', cost: 15.2 },
  { name: 'Wed', cost: 18.8 },
  { name: 'Thu', cost: 14.3 },
  { name: 'Fri', cost: 22.1 },
  { name: 'Sat', cost: 9.5 },
  { name: 'Sun', cost: 11.2 },
];

const USAGE_DATA = [
  { name: 'OpenAI', tokens: 450000 },
  { name: 'Claude', tokens: 280000 },
  { name: 'Gemini', tokens: 150000 },
  { name: 'Groq', tokens: 850000 },
];

export default function AIAnalyticsPage() {
  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-end justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-500">
            <Activity className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Monitoring & Costs</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">AI Analytics</h2>
          <p className="text-sm text-slate-500 font-medium tracking-tight">Track token consumption and infrastructure spending.</p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
          <Filter className="w-3.5 h-3.5" />
          Last 7 Days
        </button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          label="Total Spend" 
          value="$103.60" 
          trend="+12.5%" 
          trendUp={true} 
          icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
        />
        <StatCard 
          label="Token Usage" 
          value="1.73M" 
          trend="+4.2%" 
          trendUp={true} 
          icon={<Cpu className="w-5 h-5 text-blue-500" />}
        />
        <StatCard 
          label="Avg Latency" 
          value="450ms" 
          trend="-15.8%" 
          trendUp={false} 
          icon={<Zap className="w-5 h-5 text-orange-500" />}
        />
        <StatCard 
          label="Active Agents" 
          value="14" 
          trend="0%" 
          trendUp={true} 
          icon={<TrendingUp className="w-5 h-5 text-indigo-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Trend Chart */}
        <div className="bg-white dark:bg-slate-800/20 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Spending Trend</h3>
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">USD / Day</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COST_DATA}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: '800'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: '800'}} />
                <Tooltip 
                  contentStyle={{backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                  itemStyle={{color: '#0f172a', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase'}}
                />
                <Area type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage by Provider Chart */}
        <div className="bg-white dark:bg-slate-800/20 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Usage by Provider</h3>
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Tokens Shared</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USAGE_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 11, fontWeight: '900'}} className="text-slate-900 dark:text-white" width={80} />
                <Tooltip 
                  contentStyle={{backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                  cursor={{fill: 'rgba(0,0,0,0.02)'}}
                />
                <Bar dataKey="tokens" fill="#6366f1" radius={[0, 12, 12, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Feature Roadmap */}
      <div className="bg-white dark:bg-slate-800/20 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">AI Infrastructure Roadmap</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-normal">Development Progress & Deployment Status</p>
            </div>
            <div className="px-4 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 text-[9px] font-black tracking-widest uppercase">
                Internal v1.5.0
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-0">
                <thead>
                    <tr className="border-b border-slate-100 dark:border-white/5">
                        <th className="pb-4 pt-2 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest px-4">Feature Name</th>
                        <th className="pb-4 pt-2 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest px-4">Deployment Status</th>
                        <th className="pb-4 pt-2 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest px-4">Target Audience</th>
                        <th className="pb-4 pt-2 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest px-4">Description</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                    <RoadmapRow 
                        name="Advanced AI Chat" 
                        status="Published" 
                        audience="Admin, Business" 
                        description="Multi-model support with Canvas artifacts & Context-aware memory." 
                    />
                    <RoadmapRow 
                        name="Voice Lab (Real-time)" 
                        status="Testing" 
                        audience="Admin" 
                        description="Direct integration with ElevenLabs & Vapi for low-latency voice AI." 
                    />
                    <RoadmapRow 
                        name="Customer Simulator" 
                        status="Testing" 
                        audience="Business, Admin" 
                        description="Simulation environment to test AI agent performance with fake customers." 
                    />
                    <RoadmapRow 
                        name="Prompt Lab" 
                        status="Developing" 
                        audience="Admin" 
                        description="Central repository for prompt engineering, versioning, and direct A/B testing." 
                    />
                    <RoadmapRow 
                        name="Agentic Task Flow" 
                        status="Developing" 
                        audience="Admin" 
                        description="Build complex autonomous workflows using CrewAI and LangGraph logic." 
                    />
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

function RoadmapRow({ name, status, audience, description }: { name: string, status: 'Published' | 'Testing' | 'Developing', audience: string, description: string }) {
    return (
        <tr className="group hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
            <td className="py-6 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{name}</span>
                </div>
            </td>
            <td className="py-6 px-4">
                <div className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase border",
                    status === 'Published' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/10" :
                    status === 'Testing' ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/10" :
                    "bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-500/10"
                )}>
                    {status}
                </div>
            </td>
            <td className="py-6 px-4">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{audience}</span>
            </td>
            <td className="py-6 px-4">
                <p className="text-[11px] text-slate-400 dark:text-slate-600 font-bold leading-relaxed max-w-sm lowercase">{description}</p>
            </td>
        </tr>
    );
}

function StatCard({ label, value, trend, trendUp, icon }: { label: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800/20 border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 space-y-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center shadow-inner">
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black tracking-wider uppercase shadow-sm",
          trendUp ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500" : "bg-red-500/10 text-red-600 dark:text-red-500"
        )}>
          {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] leading-none mb-2">{label}</p>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{value}</h3>
      </div>
    </div>
  );
}
