import { HeroPinned } from '@/components/home/HeroPinned';
import { ProjectSection } from '@/components/home/ProjectSection';
import { FilmBand } from '@/components/home/FilmBand';
import { ProgramsCarousel } from '@/components/home/ProgramsCarousel';
import { CampusSection } from '@/components/home/CampusSection';
import { PathwaySection } from '@/components/home/PathwaySection';
import { FindProgram } from '@/components/home/FindProgram';
import { SubNav } from '@/components/layout/SubNav';
import { ACADEMY_PROGRAMS } from '@/data/academyData';

const TABS = [
  { id: 'project', label: 'The Project' },
  { id: 'programs', label: 'Programs' },
  { id: 'campus', label: 'The Campus' },
  { id: 'pathway', label: 'Player Pathway' },
];

export default function HomePage() {
  return (
    <>
      <HeroPinned />
      <SubNav label="On this page" tabs={TABS} />
      <ProjectSection />
      <FilmBand />
      <ProgramsCarousel programs={ACADEMY_PROGRAMS} />
      <CampusSection />
      <PathwaySection />
      <FindProgram />
    </>
  );
}
