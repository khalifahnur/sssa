// import { CldImage } from '@/components/media/CldImage';
// import { ButtonLink } from '@/components/ui/Button';
// import { INSTITUTIONAL_METRICS } from '@/data/academyData';

// export function CampusSection() {
//   return (
//     <section id="campus" aria-labelledby="campus-heading" className="bg-white pb-8 pt-24 lg:pt-36">
//       <div className="px-5 lg:pl-[26%] lg:pr-8">
//         <div className="max-w-[41rem]">
//           <h2 id="campus-heading" className="display reveal text-[clamp(2.8rem,3.9vw,3.6rem)]">
//             The campus
//           </h2>
//           <p className="reveal reveal-2 mt-6 text-[1.05rem] leading-[2]">
//             Cambridge-standard classrooms, science and computer labs and quiet study lounges sit alongside a residential campus for 400 scholars, with
//             separate boarding houses, dedicated staff accommodation and 24/7 pastoral care.
//           </p>
//           <ButtonLink href="/academy#campus" variant="outline-dark" arrow={false} className="reveal reveal-3 mt-8">
//             Discover more
//           </ButtonLink>
//         </div>

//         <div className="wipe-in relative mt-14 aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:mt-16 lg:aspect-[2.3/1]">
//           <div className="drift absolute -inset-y-[8%] inset-x-0">
//             <CldImage media="campus-wide" sizes="(min-width:1024px) 70vw, 100vw" className="h-full w-full" />
//           </div>
//         </div>

//         <dl className="mt-10 grid grid-cols-3 divide-x divide-navy/15 border-y border-navy/15">
//           {INSTITUTIONAL_METRICS.map((m, i) => (
//             <div key={m.label} className={`reveal reveal-${i + 1} px-3 py-7 text-center sm:px-8 sm:text-left`}>
//               <dd className="display text-[clamp(2.8rem,5vw,4.6rem)] leading-none">{m.value}</dd>
//               <dt className="mt-2 text-[0.7rem] font-extrabold uppercase tracking-label text-teal sm:text-xs">{m.label}</dt>
//             </div>
//           ))}
//         </dl>
//       </div>
//     </section>
//   );
// }
