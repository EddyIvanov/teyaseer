import React, { useContext } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from '@chakra-ui/react';

import style from './ServiceStepDetails.style';
import { ServiceRequestFlow } from '../Service/Service.type';

import { Text } from '@/components';
import ProgressBar from '@/components/atoms/ProgressBar/ProgressBar';
import { convertToCamelCase } from '@/helpers/convertToCamelCase';
import { formatDate } from '@/helpers/date';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import FontWeights from '@/styles/themes/brand/fontWeights';

type ServiceStepDetailsProp = {
  title: string;
  progress: number;
  serviceRequestFlowCollection: ServiceRequestFlow[];
  isProjectCompleted?: boolean;
};

const ServiceStepDetails = ({
  title,
  serviceRequestFlowCollection,
  progress,
  isProjectCompleted,
}: ServiceStepDetailsProp) => {
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  return (
    <Box __css={style.root}>
      <Box className="progressBar">
        <Text>
          {isProjectCompleted ? t('portal_complete') : t('portal_pending')}
        </Text>
        <ProgressBar value={progress} />
      </Box>

      <Accordion allowToggle defaultIndex={isProjectCompleted ? [-1] : [0]}>
        <AccordionItem className="accordion">
          <AccordionButton className="accordionButton">
            <Text>{title}</Text>
            <AccordionIcon fontSize="4xl" />
          </AccordionButton>
          <AccordionPanel className="accordionPanel">
            {serviceRequestFlowCollection?.map((item, index) => {
              const serviceRequestFlow = item?.stageStepServiceRequest;
              return (
                <Box
                  key={`${item?.title}-${index}`}
                  className="activityLogItem"
                >
                  <Text wordBreak="break-word">{item?.inProgressTitle}</Text>
                  <Flex gap="20px">
                    {item?.stageStepServiceRequest?.lastModifiedDate && (
                      <Text>
                        {formatDate(
                          item?.stageStepServiceRequest?.lastModifiedDate,
                          'dd/MM/yyyy',
                          locale
                        )}
                      </Text>
                    )}
                    <Text
                      className={serviceRequestFlow?.status}
                      fontWeight={FontWeights.bold}
                      textTransform="uppercase"
                    >
                      {t(
                        `portal_sr_status_${convertToCamelCase(
                          serviceRequestFlow?.status
                        )}`
                      )}
                    </Text>
                  </Flex>
                </Box>
              );
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default ServiceStepDetails;
