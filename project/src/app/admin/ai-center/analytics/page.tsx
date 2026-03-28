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
          <h2 className="text-3xl font-black text-white tracking-tight leading-none">AI Analytics</h2>
          <p className="text-sm text-slate-500 font-medium">Track token consumption and infrastructure spending.</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all">
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
        <div className="bg-slate-800/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white">Spending Trend</h3>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">USD / Day</span>
          </div>
          <div className="h-[300px] w-full items-end flex">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COST_DATA}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 'bold'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}}
                  itemStyle={{color: '#fff', fontSize: '12px', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage by Provider Chart */}
        <div className="bg-slate-800/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white">Usage by Provider</h3>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Tokens Shared</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USAGE_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#fff', fontSize: 12, fontWeight: 'black'}} width={80} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="tokens" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, trendUp, icon }: { label: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-slate-800/20 border border-white/5 rounded-3xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase",
          trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
        )}>
          {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">{label}</p>
        <h3 className="text-2xl font-black text-white tracking-tight leading-none">{value}</h3>
      </div>
    </div>
  );
}
