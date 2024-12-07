import { useContext, useEffect } from 'react';

import { Box, HStack, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { IRenderSteps } from './Steps.type';

import { Link, Text, Icon } from '@/components';
import { PARENT_ROUTE_MAPPING_FOR_HIGHLIGHTING_IN_SIDEBAR } from '@/constants/portalRoute';
import { DashboardContext } from '@/providers/DashboardContext';
import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const Steps = (props: IRenderSteps) => {
  const {
    steps,
    handleToggleMenu,
    currentSelected,
    setCurrentSelected,
    title,
  } = props;
  const { stageStatusMapping } = useContext(DashboardContext);
  const router = useRouter();

  useEffect(() => {
    const findActiveIndex = steps.findIndex(step => step.isCurrentStage);
    setCurrentSelected(findActiveIndex);
  }, [steps]);

  useEffect(() => {
    const path = router.asPath;
    let findCurrentSelectedStep = steps.findIndex(step =>
      path.startsWith(step.slug)
    );
    if (findCurrentSelectedStep < 0) {
      findCurrentSelectedStep = steps.findIndex(
        step =>
          step.slug ===
          PARENT_ROUTE_MAPPING_FOR_HIGHLIGHTING_IN_SIDEBAR[router.pathname]
      );
    }
    setCurrentSelected(findCurrentSelectedStep);
  }, [steps, router.asPath]);

  const handleChangeIndex = (index: number) => {
    handleToggleMenu();
    setCurrentSelected(index);
  };
  return (
    <Box mt="32px">
      <Text sx={{ color: colors.primary, fontWeight: FontWeights.bold }}>
        {title}
      </Text>
      <Box mt="32px">
        <VStack>
          {steps.map((step, index: number) => {
            let iconColor: string = colors.brand.secondary;
            let textColor: string = 'black';

            const isStageCompleted = stageStatusMapping[step.slug]
              ? stageStatusMapping[step.slug].isCompleteStage
              : false;
            const isCurrentStage = stageStatusMapping[step.slug]
              ? stageStatusMapping[step.slug].isCurrentStage
              : false;
            const isCurrentSelected = index === currentSelected;

            if (isStageCompleted) {
              iconColor = '#9D9D9D';
              textColor = '#9D9D9D';
            }

            if (isCurrentSelected) {
              iconColor = 'black';
              textColor = 'black';
            }
            if (isCurrentStage) {
              iconColor = colors.success;
              textColor = 'black';
            }
            const border_color = !isStageCompleted
              ? colors.brand.secondary
              : colors.border;

            return (
              <Link
                href={step.slug}
                key={index}
                sx={{
                  flex: 1,
                  w: '100%',
                  position: 'relative',
                  cursor: 'pointer',
                  gap: 0,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  textDecoration: 'none',
                  _hover: {
                    textDecoration: 'none',
                  },
                }}
              >
                <HStack onClick={() => handleChangeIndex(index)}>
                  {step.icon && (
                    <Icon
                      sx={{
                        background: 'white',
                        position: 'absolute',
                        width: 30,
                        height: 30,
                        _ltr: {
                          left: '0',
                        },
                        _rtl: {
                          right: '0',
                        },
                        top: '-2',
                        color: iconColor,
                        border: `1.54px solid ${iconColor}`,
                        borderRadius: '50%',
                        padding: isStageCompleted ? '3px' : '4px',
                        zIndex: 1,
                      }}
                      name={isStageCompleted ? 'check' : step.icon}
                    />
                  )}
                  <Text
                    as={'span'}
                    sx={{
                      fontsize: FontSizes.normal,
                      fontWeight: isCurrentSelected
                        ? FontWeights.bold
                        : FontWeights.normal,
                      color: textColor,
                      flex: 1,
                      w: '100%',
                      pb: '30px',
                      _ltr: {
                        ml: '15px',
                        pl: '27px',
                        borderLeft:
                          index !== steps.length - 1
                            ? `1px solid ${border_color}`
                            : 'none',
                      },
                      _rtl: {
                        mr: '15px',
                        pr: '27px',
                        borderRight:
                          index !== steps.length - 1
                            ? `1px solid ${border_color}`
                            : 'none',
                      },
                    }}
                  >
                    {step.name}
                  </Text>
                </HStack>
              </Link>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
};
export default Steps;
