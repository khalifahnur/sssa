import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { Tail } from '@/components/brand/Marks';
import { TrialForm } from '@/components/forms/TrialForm';
import { SubNav } from '@/components/layout/SubNav';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { ACADEMY_PROGRAMS, BRAND_CONTACT, PLAYER_TESTIMONIALS } from '@/data/academyData';

export const metadata: Metadata = pageMetadata({
  title: 'Admissions & contact — book a trial evaluation',
  description:
    'Apply to St. Sebastian Sports Academy. Book a trial evaluation, ask about programs for ages 8–21, and get in touch with the admissions team in Research Triangle Park, NC.',
  path: '/admissions',
  keywords: ['football academy admissions', 'book a trial', 'scholar athlete application', 'contact St. Sebastian'],
});

const TABS = [
  { id: 'how-it-works', label: 'How it works' },
  { id: 'trial', label: 'Trial request' },
  { id: 'stories', label: 'Stories' },
  { id: 'faq', label: 'FAQ' },
];

const STEPS = [
  { title: 'Tell us about your athlete', body: 'Share age, position, experience and the program you are interested in using the form below.' },
  { title: 'Trial evaluation', body: 'Our coaching team arranges an evaluation session so we can see your athlete in action.' },
  { title: 'Personal feedback', body: 'You receive a written assessment and a recommended pathway from the admissions team.' },
  { title: 'Join the academy', body: 'Accept your place and begin the journey from aspiration to achievement.' },
];

const FAQS = [
  { q: 'Which age groups can apply?', a: `We run programs from ages 8 to 21: ${ACADEMY_PROGRAMS.map((p) => `${p.title} (${p.ageRange})`).join('; ')}.` },
  { q: 'Is education part of every program?', a: 'Our teen and scholar programs integrate academic tutoring and accredited coursework alongside football. The Full-Time Pro & Scholar Pathway combines daily training with college-preparatory academics.' },
  { q: 'What is the coach-to-athlete ratio?', a: 'Ratios range from 1:10 in the Teen Competitive Academy to 1:8 for Youth, 1:6 for the Scholar Pathway and 1:1 for Elite Mastery sessions.' },
  { q: 'How do I book a trial?', a: 'Complete the trial request form on this page. The admissions team will contact you to arrange an evaluation date.' },
  { q: 'Where is the academy?', a: BRAND_CONTACT.address },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function AdmissionsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Admissions', path: '/admissions' }]), faqLd]} />
      <SubNav label="On this page" tabs={TABS} first />
      <PageHero
        section="Admissions"
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Admissions' }]}
        media="project-banner"
        title={
          <>
            Your place on the <Tail>team</Tail>
          </>
        }
        intro="Book a trial evaluation, ask about a program, or simply say hello. The admissions team replies to every enquiry."
      />

      <section id="how-it-works" aria-labelledby="steps-heading" className="bg-white py-20 lg:py-28">
        <div className="gutter wrap">
          <h2 id="steps-heading" className="display text-xl-display">
            How it <Tail>works</Tail>
          </h2>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className={`reveal reveal-${i + 1} border-t-[3px] border-navy pt-6`}>
                <p className="display text-6xl text-green">0{i + 1}</p>
                <h3 className="mt-3 text-lg font-extrabold uppercase leading-tight tracking-wide">{s.title}</h3>
                <p className="mt-3 opacity-75">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="trial" aria-labelledby="trial-heading" className="bg-mist py-20 lg:py-32">
        <div className="gutter wrap grid gap-16 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <SectionHeader title="Trial request" section="Apply" />
            <h2 id="trial-heading" className="display text-mega mt-10 mb-12">
              Request a <Tail>trial</Tail>
            </h2>
            <Suspense fallback={<div className="h-96 animate-pulse bg-navy/5" aria-hidden="true" />}>
              <TrialForm />
            </Suspense>
          </div>
          <aside aria-labelledby="contact-heading" className="self-start bg-navy p-8 text-white lg:mt-32 lg:p-10">
            <h2 id="contact-heading" className="text-xs font-extrabold uppercase tracking-label text-green">
              Contact the academy
            </h2>
            <address className="mt-6 space-y-6 text-lg not-italic">
              <p>
                <span className="block text-xs font-bold uppercase tracking-label text-white/50">Visit</span>
                {BRAND_CONTACT.address}
              </p>
              <p>
                <span className="block text-xs font-bold uppercase tracking-label text-white/50">Call</span>
                <a href={`tel:${BRAND_CONTACT.phone.replace(/[^+\d]/g, '')}`} className="hover:text-green">
                  {BRAND_CONTACT.phone}
                </a>
              </p>
              <p>
                <span className="block text-xs font-bold uppercase tracking-label text-white/50">Email</span>
                <a href={`mailto:${BRAND_CONTACT.email}`} className="break-all hover:text-green">
                  {BRAND_CONTACT.email}
                </a>
              </p>
            </address>
          </aside>
        </div>
      </section>

      <section id="stories" aria-labelledby="voices-heading" className="bg-teal py-20 text-white lg:py-32">
        <div className="gutter wrap">
          <h2 id="voices-heading" className="display text-xl-display">
            In their <Tail>words</Tail>
          </h2>
          <ul className="mt-14 grid gap-px bg-white/15 lg:grid-cols-3">
            {PLAYER_TESTIMONIALS.map((t, i) => (
              <li key={t.id} className={`reveal reveal-${i + 1} flex flex-col justify-between bg-teal p-8 lg:p-10`}>
                <blockquote className="text-lg font-semibold leading-snug">{t.quote}</blockquote>
                <footer className="mt-8 border-t-[3px] border-green pt-5">
                  <p className="font-extrabold uppercase tracking-wide">{t.name}</p>
                  <p className="text-sm text-white/65">{t.role}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-green">{t.outcome}</p>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="bg-white py-20 lg:py-32">
        <div className="gutter wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 id="faq-heading" className="display text-xl-display">
            Common <Tail>questions</Tail>
          </h2>
          <div className="border-t-[3px] border-navy">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-navy/15">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-extrabold">
                  {f.q}
                  <span aria-hidden="true" className="relative h-5 w-5 shrink-0">
                    <span className="absolute left-0 top-1/2 h-[3px] w-5 -translate-y-1/2 bg-green" />
                    <span className="absolute left-1/2 top-0 h-5 w-[3px] -translate-x-1/2 bg-green transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed opacity-75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
