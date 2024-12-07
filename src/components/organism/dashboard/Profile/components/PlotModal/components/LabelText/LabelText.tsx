import { LabelTextProps } from './LabelText.types';

import { Text } from '@/components';

const LabelText = ({ title, value }: LabelTextProps) => (
  <Text fontSize={'small'}>
    <Text
      fontSize={'small'}
      as={'span'}
      fontWeight={'semibold'}
      display={'flex'}
    >
      {title}:{' '}
    </Text>
    {value}
  </Text>
);

export default LabelText;
