import { PropsWithChildren } from 'react';

import { SystemStyleObject } from '@chakra-ui/react';

import { AssetType } from '@/types/ContentFul.type';

interface PulseArticleProps extends PropsWithChildren {
  style: Record<string, SystemStyleObject>;
  backButtonNode?: React.ReactNode;
  backgroundImage: AssetType;
}

export default PulseArticleProps;
