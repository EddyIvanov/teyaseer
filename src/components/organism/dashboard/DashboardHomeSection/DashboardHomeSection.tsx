import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box, Flex } from '@chakra-ui/react';

import style from './DashboardHomeSection.style';
import CenteredLoader from '../CenteredLoader/CenteredLoader';
import DashboardProjectCompletionSummary from '../DashboardProjectCompletionSummary/DashboardProjectCompletionSummary';

import handoverAnimationData from '@/assets/lottie/handover-fireworks.json';
import { ContentfulRichText, PulseArticle } from '@/components';
import { SocialLinksType } from '@/components/molecules/SocialLinks/SocailLinks.type';
import SocialLinks from '@/components/molecules/SocialLinks/SocialLinks';
import Client from '@/lib/contentFul';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';
import { ContentTypeResponseType } from '@/types/ContentFul.type';

const DashboardHomeSection = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinksType>();
  const [isLoading, setIsLoading] = useState(false);

  const animationContainer = useRef<HTMLDivElement>(null);

  const { serviceStages, user, lastStage } = useContext(DashboardContext);
  const { locale } = useContext(Context);

  const dashboardHomeContentData = useMemo(
    () =>
      serviceStages.filter(
        stage => stage.sfStageName === user?.userInfo.projectInfo.stage
      )[0]?.homescreenContent?.fields,
    [serviceStages, user]
  );

  const isLastStep = useMemo(
    () => user?.userInfo.projectInfo.stage === lastStage?.sfStageName,
    [user, lastStage]
  );

  const configureLottieAnimation = useCallback(async () => {
    if (isLastStep) {
      const lottieWeb = (await import('lottie-web')).default;
      const loadanimation = lottieWeb.loadAnimation({
        container: animationContainer.current as HTMLDivElement,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: handoverAnimationData,
      });

      loadanimation.addEventListener('complete', function () {
        loadanimation.destroy();
      });
    }
  }, [isLastStep]);

  useEffect(() => {
    if (isLastStep) {
      setIsLoading(true);
      Client.getEntries({
        content_type: 'socialLinks',
        locale: locale,
        include: 10,
      })
        .then(response => {
          setSocialLinks((response as ContentTypeResponseType).items[0]);
        })
        .catch(() => {
          setSocialLinks(undefined);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (
    dashboardHomeContentData?.backgroundImage &&
    dashboardHomeContentData?.description
  ) {
    return (
      <Flex gap="20px" flexDirection="column" position="relative">
        {isLastStep && (
          <>
            <DashboardProjectCompletionSummary
              triggerLoadingFinished={configureLottieAnimation}
            />
            <Flex
              style={{
                position: 'absolute',
                zIndex: 13, // pulse article white linear gradient has 12 z-index
                width: '100%',
                pointerEvents: 'none',
              }}
              ref={animationContainer}
            ></Flex>
          </>
        )}
        {isLoading ? (
          <CenteredLoader variant="dashbaordHomeSkeleton" />
        ) : (
          <PulseArticle
            style={style}
            backgroundImage={dashboardHomeContentData.backgroundImage}
          >
            <ContentfulRichText
              document={dashboardHomeContentData.description}
              className="descriptionNode"
              hyperlinkType={
                dashboardHomeContentData.displayLinkAs?.fields?.type
              }
            />
            {isLastStep && (
              <Box mt="30px">
                <SocialLinks socialLinks={socialLinks} />
              </Box>
            )}
          </PulseArticle>
        )}
      </Flex>
    );
  }
};

export default DashboardHomeSection;
