import React from 'react';

import { Tag, TagLabel, TagLeftIcon, TagRightIcon } from '@chakra-ui/react';

import style from './InfoStatus.style';
import { InfoStatusProps } from './InfoStatus.type';

import {
  activeChecked,
  questionOutlined,
  exclamationMark,
} from '@/components/atoms/Icon/const';
import { StatusProject } from '@/helpers/statusProject';
import useTranslation from '@/hooks/useTranslate';

const InfoStatus = ({ status, onClick }: InfoStatusProps) => {
  const { t } = useTranslation();
  const isProjectOnHold = StatusProject.isOnHold(status);

  return (
    <Tag data-on-hold={isProjectOnHold} sx={style.root} onClick={onClick}>
      <TagLeftIcon
        sx={style.leftIcon}
        as={isProjectOnHold ? exclamationMark : activeChecked}
      />

      <TagLabel sx={style.label}>
        {isProjectOnHold
          ? t('portal_project_status_on_hold')
          : t('portal_project_status_active')}
      </TagLabel>
      <TagRightIcon
        data-on-hold={isProjectOnHold}
        sx={style.rightIcon}
        as={questionOutlined}
      />
    </Tag>
  );
};

export default InfoStatus;
