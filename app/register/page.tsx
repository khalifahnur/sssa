import type { Metadata } from 'next';
import { JsonLd } from '@/components/ui/JsonLd';
import { RegistrationForm } from '@/components/forms/RegistrationForm';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { BRAND_CONTACT } from '@/data/academyData';

export const metadata: Metadata = pageMetadata({
  title: 'Register a player',
  description:
    'Register a player at St. Sebastian Sports Academy. Fill in a few details and pay the registration fee by M-Pesa.',
  path: '/register',
  keywords: ['register football academy', 'academy registration', 'pay by M-Pesa', 'St. Sebastian Sports Academy'],
});

export default function RegisterPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Register', path: '/register' },
          ]),
        ]}
      />
      <section aria-labelledby="register-heading" className="bg-mist pb-20 pt-[calc(var(--header-h)+3.5rem)] lg:pb-32">
        <div className="gutter wrap grid gap-16 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-label text-teal">Join the academy</p>
            <h1 id="register-heading" className="display text-mega mt-4 mb-6">
              Register a player
            </h1>
            <p className="mb-12 max-w-xl text-lg leading-relaxed text-navy/75">
              Tell us who is joining and pay the registration fee by M-Pesa. It takes about two minutes.
            </p>
            <RegistrationForm />
          </div>

          <aside aria-labelledby="register-help-heading" className="self-start bg-navy p-8 text-white lg:mt-32 lg:p-10">
            <h2 id="register-help-heading" className="text-xs font-extrabold uppercase tracking-label text-green">
              Need help?
            </h2>
            <address className="mt-6 space-y-6 text-lg not-italic">
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
    </>
  );
}
