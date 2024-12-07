import { Show } from '@chakra-ui/react';

import { TimelineProps } from './Timeline.type';
import AccordionTimeline from './components/AccordionTimeline';
import SwiperTimeline from './components/SwiperTimeline';

const Timeline = (props: TimelineProps) => {
  return (
    <>
      <Show above="lg">
        <SwiperTimeline {...props} />
      </Show>
      <Show below="lg">
        <AccordionTimeline {...props} />
      </Show>
    </>
  );
};

export default Timeline;
