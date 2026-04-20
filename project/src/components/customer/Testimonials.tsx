'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Linh Tran',
    role: 'Product Designer · Ho Chi Minh City',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    text: 'The packaging alone felt like unboxing a piece of art. Delivery was two days ahead of the estimate.',
  },
  {
    name: 'Marcus Weir',
    role: 'Chef · Copenhagen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'I ordered the ceramic pour-over set and now the rest of my morning routine feels out of place.',
  },
  {
    name: 'Amelia Okafor',
    role: 'Runner · Lagos',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'Runner 7s carried me through a half-marathon PR. Customer support replied to my sizing question in 4 minutes.',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">
            People who shop here
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
            Words from the <span className="italic">community.</span>
          </h2>
          <p className="text-slate-500 font-medium">
            10,000+ customers in 42 countries. Here&apos;s what a few of them had to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, idx) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="relative p-8 rounded-3xl bg-slate-50 ring-1 ring-slate-100 space-y-6"
            >
              <Quote className="w-8 h-8 text-rose-500/30" />
              <blockquote className="text-slate-700 leading-relaxed">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                ))}
              </div>
              <figcaption className="flex items-center gap-3 pt-2 border-t border-slate-200">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-200 ring-2 ring-white shadow">
                  <Image src={r.avatar} alt={r.name} fill sizes="44px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{r.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {r.role}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
