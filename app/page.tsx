import { HeroPinned } from '@/components/home/HeroPinned';
import { MissionVision } from '@/components/home/MissionVision';
import { StatsBand } from '@/components/home/StatsBand';
import { ValuesHorizontal } from '@/components/home/ValuesHorizontal';
import { ProgramsCarousel } from '@/components/home/ProgramsCarousel';
import { PathwayTimeline } from '@/components/home/PathwayTimeline';
import { CtaBand } from '@/components/sections/CtaBand';
import { SubNav } from '@/components/layout/SubNav';
import { Ridge } from '@/components/sections/Ridge';
import { Marquee } from '@/components/sections/Marquee';
import { ACADEMY_PROGRAMS } from '@/data/academyData';

const TABS = [
  { id: 'mission', label: 'Mission & Vision' },
  { id: 'values', label: 'Values' },
  { id: 'programs', label: 'Programs' },
  { id: 'legacy', label: 'Legacy' },
];

export default function HomePage() {
  return (
    <>
      <HeroPinned />
      <SubNav label="On this page" tabs={TABS} />
      <MissionVision />
      <StatsBand />
      <ValuesHorizontal />
      <ProgramsCarousel programs={ACADEMY_PROGRAMS} />
      <PathwayTimeline />
      <Ridge color="#ffffff" facet="#1f4b50" opacity={0.12} profile={2} />
      <Marquee />
      <CtaBand />
    </>
  );
}
