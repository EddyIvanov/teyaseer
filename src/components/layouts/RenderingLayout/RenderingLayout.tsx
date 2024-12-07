import { SwiperSlide } from 'swiper/react';

import DYNAMIC_RENDERINGS from './constants';

import { RenderingsType } from '@/types/ContentFul.type';

interface RenderingLayoutProps {
  title?: string;
  renderings: RenderingsType[];
  renderComponentsAs?: any;
}

export const RendringASItems = ({
  title = '',
  renderings,
  renderComponentsAs,
}: RenderingLayoutProps) => {
  const items = [];
  for (const item of renderings) {
    const contentType = item?.fields?.contentType;
    const systemId = item?.sys?.id;
    const Rendering = DYNAMIC_RENDERINGS[contentType] as React.ElementType;

    if (Rendering) {
      const id = `${contentType}-${systemId}`;
      const props = { title, ...item.fields, id };
      if (renderComponentsAs) {
        items.push(
          <SwiperSlide key={systemId}>
            <Rendering {...props} />
          </SwiperSlide>
        );
      } else {
        items.push(<Rendering key={item.sys.id} {...item.fields} />);
      }
    }
  }
  return items;
};

const RenderingLayout = ({ renderings, title }: RenderingLayoutProps) => {
  return (
    <>
      {renderings.map((rendering: RenderingsType) => {
        const contentType = rendering?.fields?.contentType;
        const systemId = rendering?.sys?.id;

        if (!contentType) return null;
        const Rendering = DYNAMIC_RENDERINGS[contentType] as React.ElementType;
        if (!Rendering) return null;
        const id = `${contentType}-${systemId}`;
        const props = { title, ...rendering.fields, id };
        return <Rendering key={systemId} {...props} />;
      })}
    </>
  );
};

export default RenderingLayout;
