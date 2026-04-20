'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Globe2,
  Heart,
  Leaf,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from 'lucide-react';

const VALUES = [
  {
    icon: Leaf,
    title: 'Sustainable by default',
    text: 'We work exclusively with ateliers that can show their supply chain end-to-end. 92% of our catalog ships in recyclable packaging.',
  },
  {
    icon: Heart,
    title: 'Humans, not algorithms',
    text: 'Every product on OneCommerce is selected by a real curator. No paid placements, no dark patterns.',
  },
  {
    icon: ShieldCheck,
    title: 'Built to last',
    text: '2-year quality guarantee on everything over $100. If it breaks under normal use, we replace it.',
  },
];

const STATS = [
  { value: '10,000+', label: 'Happy customers' },
  { value: '42', label: 'Countries shipped' },
  { value: '120+', label: 'Independent brands' },
  { value: '4.87', label: 'Avg. review score' },
];

const TIMELINE = [
  {
    year: '2021',
    title: 'A tiny storefront',
    text: 'Founded in Ho Chi Minh City as a weekend project between three friends obsessed with everyday objects.',
  },
  {
    year: '2023',
    title: 'Going global',
    text: 'Launched international shipping to 30+ countries and welcomed our first 1,000-order month.',
  },
  {
    year: '2025',
    title: 'A marketplace grows up',
    text: 'Opened the platform to independent makers. Today 120+ brands call OneCommerce home.',
  },
  {
    year: '2026',
    title: 'Spring Collection',
    text: 'The biggest drop yet — and a refreshed experience built on a modular storefront technology.',
  },
];

const TEAM = [
  {
    name: 'Binh Vu',
    role: 'Founder · CEO',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
  {
    name: 'Thao Nguyen',
    role: 'Head of Curation',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Derek Chen',
    role: 'Head of Engineering',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'Maya Fischer',
    role: 'Operations Lead',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative px-6 pt-16 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-6xl mx-auto relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-6"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8"
          >
            Commerce, <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
              re-imagined.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-slate-600 text-lg font-medium leading-relaxed"
          >
            OneCommerce is a curated marketplace for people who care how things are made. We
            partner with independent ateliers and design studios to put long-lived, beautifully
            crafted objects within reach — and we build the technology to make the journey feel as
            good as the thing in the box.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-12 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="text-center space-y-1"
            >
              <p className="text-4xl md:text-5xl font-black tracking-tighter">{s.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
              What we stand for
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16">
            Three quiet principles.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-8 rounded-3xl bg-slate-50 ring-1 ring-slate-100 space-y-5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight">{v.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial image + copy */}
      <section className="px-6 py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden ring-8 ring-white/5"
          >
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
              alt="A curated boutique interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">
              The craft
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
              We spend months <br /> meeting makers.
            </h2>
            <p className="text-slate-300 font-medium leading-relaxed">
              Every brand on the platform has been visited in person — a workshop in Kyoto, a
              cobbler in Porto, a ceramic studio outside Ho Chi Minh City. If we wouldn&apos;t
              gift it, we won&apos;t sell it.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-rose-400" />
                <span className="text-xs font-black uppercase tracking-widest">
                  120+ partner studios
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Globe2 className="w-5 h-5 text-rose-400" />
                <span className="text-xs font-black uppercase tracking-widest">
                  14 countries
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-rose-400" />
                <span className="text-xs font-black uppercase tracking-widest">
                  2yr guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16 text-center">
            A short timeline.
          </h2>
          <ol className="relative border-l-2 border-slate-100 ml-3 space-y-12">
            {TIMELINE.map((t, idx) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="pl-10 relative"
              >
                <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-rose-500 ring-4 ring-white" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-1">
                  {t.year}
                </p>
                <h3 className="text-xl font-black tracking-tight mb-1">{t.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-24 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">
              The team
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
              A small crew, <br />
              <span className="italic">big obsession.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((m, idx) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="space-y-3 text-center"
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-200 ring-1 ring-slate-100">
                  <Image src={m.avatar} alt={m.name} fill sizes="(max-width: 768px) 45vw, 18vw" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-black">{m.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {m.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-rose-500 via-rose-500 to-orange-500 text-white space-y-8">
          <Truck className="w-8 h-8 mx-auto" />
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
            Start somewhere <br /> small.
          </h2>
          <p className="text-white/85 max-w-xl mx-auto">
            Browse the collection and begin with one beautifully made thing. We&apos;ll take care of the
            rest — including free returns for 30 days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/customer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-slate-900 text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-colors"
            >
              Shop the collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/customer/offers"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border-2 border-white/30 text-white text-xs font-black uppercase tracking-widest hover:border-white hover:bg-white/10 transition-colors"
            >
              See current offers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
