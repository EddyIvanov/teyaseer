import { memo } from 'react';

import { ChakraProps, chakra } from '@chakra-ui/react';

import * as icons from '@/components/atoms/Icon/const';

export type IconNames = keyof typeof icons;
interface IconProps extends ChakraProps {
  name: IconNames;
  variant?: string;
  className?: string;
}
type SvgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

const Icon = ({ name, w = '24px', h = '24px', ...rest }: IconProps) => {
  if (!name || !icons[name]) {
    return null;
  }

  const DynamicIcon: SvgIcon = icons[name];
  const MyIcon = chakra(DynamicIcon);
  return <MyIcon w={w} h={h} {...rest} />;
};

export default memo(Icon);
