import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';

import style from './ServiceInfoTitle.styles';
import { IServiceInfoTitleProps } from './ServiceInfoTitle.type';

import useTranslation from '@/hooks/useTranslate';

const ServiceInfoTitle = ({
  title = 'portal_service_info_title',
  defaultCollapsed,
  children,
}: IServiceInfoTitleProps) => {
  const { t } = useTranslation();
  return (
    <Accordion allowToggle defaultIndex={[defaultCollapsed ? 0 : -1]}>
      <AccordionItem border="none">
        <AccordionButton sx={style.accordionButton}>
          <Text>{t(title)}</Text>
          <AccordionIcon sx={style.accordionIcon} />
        </AccordionButton>
        <AccordionPanel padding="0">{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ServiceInfoTitle;
