import React from 'react';

import { Progress, ProgressProps } from '@chakra-ui/react';

import style from './ProgressBar.style';

const ProgressBar = ({ ...props }: ProgressProps) => {
  return <Progress __css={style.root} {...props} />;
};

export default ProgressBar;
