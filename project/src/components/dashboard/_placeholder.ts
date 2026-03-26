'use client';

import dynamic from 'next/dynamic';
import type { ChartDataPoint } from '@/lib/types/admin';

// Dynamically import recharts to prevent SSR issues
const {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} = await import('recharts').catch(() => ({
  AreaChart: null, Area: null, BarChart: null, Bar: null,
  XAxis: null, YAxis: null, CartesianGrid: null, Tooltip: null, ResponsiveContainer: null,
}));
