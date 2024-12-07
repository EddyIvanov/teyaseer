import { HStack } from '@chakra-ui/react';

import { IRateProps } from './Rate.type';
import { Icon } from '..';
import { IconNames } from '../Icon/Icon';

const Rate = (props: IRateProps) => {
  const { rate = 0, maxRate = 5, size = '15px' } = props;
  const arr = Array.from({ length: maxRate }, (_, i) => i + 1);
  return (
    <HStack>
      {arr.map((item, index) => {
        // we have 3 state fill , empty and half fill
        const IconName: IconNames =
          item <= rate
            ? 'starFill'
            : item - 0.5 <= rate
            ? 'starHalf'
            : 'starEmpty';

        return (
          <Icon
            sx={{
              _rtl: {
                transform: 'scaleX(-1)',
              },
            }}
            key={`rate-${index}`}
            name={IconName}
            width={size}
            height={size}
          />
        );
      })}
    </HStack>
  );
};
export default Rate;
