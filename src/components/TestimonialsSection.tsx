import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { testimonials, type Testimonial } from '../data/testimonials';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'text-amber fill-amber' : 'text-steel'}`}
        />
      ))}
    </div>
  );
}

import React from 'react';

function TestimonialCard({ t, index }: { t: Testimonial; index: number; key?: React.Key }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-carbon border border-steel rounded p-6 flex flex-col gap-4 hover:border-amber/40 transition-colors shadow-soft-dark"
      itemScope
      itemType="https://schema.org/Review"
    >
      <meta itemProp="reviewBody" content={t.quote} />
      <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
        <meta itemProp="ratingValue" content={String(t.rating)} />
        <meta itemProp="bestRating" content="5" />
      </div>
      <div itemProp="author" itemScope itemType="https://schema.org/Person">
        <meta itemProp="name" content={t.author} />
      </div>
      <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="Alfred Corp" />
      </div>

      <Quote className="w-6 h-6 text-amber/40 shrink-0" aria-hidden="true" />

      <blockquote className="text-slate-300 text-sm leading-relaxed font-sans flex-1">
        "{t.quote}"
      </blockquote>

      <div className="flex flex-col gap-2 pt-2 border-t border-steel/60">
        <StarRating rating={t.rating} />
        <div>
          <p className="text-slate-100 text-sm font-heading font-semibold">{t.author}</p>
          <p className="text-slate-400 text-xs font-mono">{t.role} — {t.company}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-carbon border-b border-steel relative" aria-label="Client testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-sm font-mono text-amber tracking-widest uppercase mb-6 border border-amber/30 bg-amber/10 inline-block px-4 py-1.5 rounded">
            Client Results
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 tracking-tight mb-4">
            What our clients say
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Real outcomes from real businesses using Alfred Corp's agentic platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber hover:text-amber/80 transition-colors border border-amber/30 px-5 py-2.5 rounded hover:border-amber/60"
          >
            Read the full case studies →
          </a>
        </div>
      </div>
    </section>
  );
}
