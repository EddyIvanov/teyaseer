import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react';

import style from './ServiceInfoList.styles';
import { IServiceInfoListProps } from './ServiceInfoList.type';

import { Icon, Image } from '@/components';

const ServiceInfoList = ({ infoData }: IServiceInfoListProps) => (
  <Accordion sx={style.accordion} allowMultiple>
    {infoData.map((info, index) => (
      <AccordionItem key={index} sx={style.accordionItem}>
        <AccordionButton sx={style.accordionButton}>
          <Box sx={style.thumbContainer}>
            {info.icon && (
              <Box sx={style.thumbIconContainer}>
                <Icon name={info.icon} height="24px" width="24px" />
              </Box>
            )}
            {info.infoThumbnail && (
              <Image
                lazyLoadTheme={'light'}
                src={info.infoThumbnail.fields.file.url}
                fill
                loaderOpt={{ h: 130, w: 130 }}
                alt={info.infoThumbnail.fields.title}
              />
            )}
          </Box>
          <Box sx={style.titleContainer}>
            {info.title && <Heading sx={style.title}>{info.title}</Heading>}
            <AccordionIcon fontSize="large" />
          </Box>
        </AccordionButton>
        <AccordionPanel sx={style.accordionPanel}>
          {info.infoDescription && (
            <Text sx={style.description}>{info.infoDescription}</Text>
          )}
        </AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);

export default ServiceInfoList;
