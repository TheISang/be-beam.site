import type { FilterOption } from '@/types/components';

import { TabsContent } from '../atoms/tabs/Tabs';
import GridGroup from '../organisms/gridGroup/GridGroup';
import GuideBookCard from '../organisms/GuideBookCard';
import type { GuidebookSummary } from '@/types/entities';

export default function GuideBooksContent({
  list,
  datas,
}: {
  list: FilterOption[];
  datas: GuidebookSummary[];
}) {
  return (
    <>
      {list.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-10 w-full">
          <GridGroup columns={3} gap={8}>
            {datas?.map((data) => <GuideBookCard key={data.id} data={data} />)}
          </GridGroup>
        </TabsContent>
      ))}
    </>
  );
}
