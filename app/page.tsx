import { HeroPinned } from '@/components/home/HeroPinned';
import { MissionScrub } from '@/components/home/MissionScrub';
import { StatsBand } from '@/components/home/StatsBand';
import { ValuesHorizontal } from '@/components/home/ValuesHorizontal';
import { ProgramsStack } from '@/components/home/ProgramsStack';
import { PathwayTimeline } from '@/components/home/PathwayTimeline';
import { FixturesPreview } from '@/components/home/FixturesPreview';
import { NewsPreview } from '@/components/home/NewsPreview';
import { CtaBand } from '@/components/sections/CtaBand';
import { SubNav } from '@/components/layout/SubNav';
import { Ridge } from '@/components/sections/Ridge';
import { Marquee } from '@/components/sections/Marquee';
import { ACADEMY_PROGRAMS } from '@/data/academyData';

const TABS = [
  { id: 'mission', label: 'Mission' },
  { id: 'values', label: 'Values' },
  { id: 'programmes', label: 'Programmes' },
  { id: 'legacy', label: 'Legacy' },
  { id: 'matchday', label: 'Matchday' },
  { id: 'news', label: 'News' },
];

export default function HomePage() {
  return (
    <>
      <HeroPinned />
      <SubNav label="On this page" tabs={TABS} />
      <MissionScrub />
      <StatsBand />
      <ValuesHorizontal />
      <ProgramsStack programs={ACADEMY_PROGRAMS} />
      <PathwayTimeline />
      <Ridge color="#f3f6ef" facet="#1f4b50" opacity={0.12} profile={2} />
      <FixturesPreview />
      <NewsPreview />
      <Marquee />
      <CtaBand />
    </>
  );
}
