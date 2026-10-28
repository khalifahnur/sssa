import { HeroPinned } from '@/components/home/HeroPinned';
import { MissionScrub } from '@/components/home/MissionScrub';
import { StatsBand } from '@/components/home/StatsBand';
import { ValuesHorizontal } from '@/components/home/ValuesHorizontal';
import { ProgramsStack } from '@/components/home/ProgramsStack';
import { PathwayTimeline } from '@/components/home/PathwayTimeline';
import { FixturesPreview } from '@/components/home/FixturesPreview';
import { NewsPreview } from '@/components/home/NewsPreview';
import { CtaBand } from '@/components/sections/CtaBand';
import { ACADEMY_PROGRAMS } from '@/data/academyData';

export default function HomePage() {
  return (
    <>
      <HeroPinned />
      <MissionScrub />
      <StatsBand />
      <ValuesHorizontal />
      <ProgramsStack programs={ACADEMY_PROGRAMS} />
      <PathwayTimeline />
      <FixturesPreview />
      <NewsPreview />
      <CtaBand />
    </>
  );
}
