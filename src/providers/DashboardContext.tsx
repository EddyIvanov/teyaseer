import React, { createContext, useContext, useEffect, useState } from 'react';

import Router, { useRouter } from 'next/router';

import { Context } from './MainContext';

import { SurveyModal } from '@/components';
import MissingPlotLocation from '@/components/organism/dashboard/MissingPlotLocation';
import {
  StageData,
  StageStatusMappingType,
} from '@/components/organism/dashboard/Stages/Stage.type';
import AppRoutes from '@/constants/AppRoutes';
import {
  PREFERRED_LANG_COOKIE,
  REMIND_LATER_SURVEY_COOKIE,
  SKIP_UPDATE_PLOT_LOCATION_COOKIE,
} from '@/constants/storage.constants';
import { getLocaleCode } from '@/helpers/locale';
import { getCookie, setCookie } from '@/helpers/utils';
import Client from '@/lib/contentFul';
import {
  getCurrentStageApi,
  getMe,
  getStageByName,
  getUserPendingSurvey,
} from '@/services/users';
import { ContentTypeResponseType } from '@/types/ContentFul.type';
import {
  IDashboardContextProps,
  IDashboardContextReturnType,
  IDashboardContextState,
} from '@/types/dashboardContext.type';
import { IMe } from '@/types/user.type';

export const DashboardContext = createContext<IDashboardContextReturnType>(
  {} as IDashboardContextReturnType
);

const DashboardProvider = ({ children }: IDashboardContextProps) => {
  const router = useRouter();
  const { locale } = router;
  const { setContextData } = useContext(Context);

  const [state, setState] = useState<IDashboardContextState>({
    user: undefined,
    serviceStages: [],
    currentStage: undefined,
    lastStage: undefined,
    stageStatusMapping: {},
    isLoading: true,
    userLoading: true,
  });
  const [surveyUrl, setSurveyUrl] = useState<string>('');
  const [showMissingPlotLocation, setShowMissingPlotLocation] = useState(false);
  const { user } = state;
  const missingPlotLocation =
    user?.isOnboardingComplete && user?.userInfo?.plotInfo?.id;

  const isLoggedIn = (): boolean => {
    return !!state.user;
  };

  const setStageStatusMapping = (
    isCompleteStage: boolean,
    isCurrentStage: boolean
  ) => ({
    isCompleteStage: isCompleteStage || false,
    isCurrentStage: isCurrentStage,
  });

  useEffect(() => {
    const remindCookie = getCookie(REMIND_LATER_SURVEY_COOKIE);
    if (remindCookie) return;
    getUserPendingSurvey()
      .then(res => {
        if (res.url) {
          const url = res.url;
          setSurveyUrl(url);
          setCookie(REMIND_LATER_SURVEY_COOKIE, 'true');
        }
      })
      .catch(e => {
        console.error('Servey error', e);
      });
  }, []);

  useEffect(() => {
    if (locale) {
      initialLoadStages();
    }
  }, [locale]);

  useEffect(() => {
    updateUserContext();
  }, [locale]);

  // Update the sidebar items status ( current, complete, ...)
  useEffect(() => {
    updateStagesStatus();
  }, [
    state.serviceStages,
    state.currentStage,
    user?.userInfo.projectInfo,
    locale,
  ]);

  const updateDashboardState = (state: Partial<IDashboardContextState>) => {
    setState(prevState => ({
      ...prevState,
      ...state,
    }));
  };

  const initialLoadStages = async () => {
    updateDashboardState({
      isLoading: true,
    });
    try {
      const page: ContentTypeResponseType = await Client.getEntries({
        content_type: 'sfService',
        locale: locale,
        include: 10,
        order: 'fields.stageOrder' as any,
      });
      const data: StageData[] = [];
      for (const item of page.items) {
        data.push({
          ...item.fields,
          isCompleteStage: false,
          isCurrentStage: false,
        });
      }
      updateDashboardState({
        serviceStages: data,
        isLoading: false,
        lastStage: data[data.length - 1],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateStagesStatus = () => {
    const stageStatusMapping: StageStatusMappingType = {};
    if (user?.userInfo.projectInfo.stage) {
      const findInx = state.serviceStages.findIndex(
        item => item.sfStageName === (user?.userInfo.projectInfo.stage || '')
      );
      if (findInx >= 0) {
        for (let i = 0; i < state.serviceStages.length; i++) {
          if (i < findInx) {
            stageStatusMapping[state.serviceStages[i].slug] =
              setStageStatusMapping(true, false);
          }
          if (i === findInx) {
            stageStatusMapping[state.serviceStages[i].slug] =
              setStageStatusMapping(false, true);
          }
          if (i > findInx) {
            stageStatusMapping[state.serviceStages[i].slug] =
              setStageStatusMapping(false, false);
          }
        }
      }
    }
    setState(prevState => ({ ...prevState, stageStatusMapping }));
  };

  const updateCurrentStage = async (abortController: AbortController) => {
    const currStageResponse = await getCurrentStageApi(
      locale || 'ar',
      abortController
    ).catch(() => {});

    if (currStageResponse && currStageResponse.data) {
      const currStage: StageData =
        currStageResponse.data.data.sfServiceCollection.items[0];

      if (user && user?.userInfo) {
        const tmp_user = { ...user };
        tmp_user.userInfo.projectInfo.stage = currStage.sfStageName;
        updateDashboardState({
          user: tmp_user,
        });
      }
      setState(prevState => {
        const findInx = state.serviceStages.findIndex(
          itm => itm.slug === currStage.slug
        );
        const newStages = [...prevState.serviceStages];
        // TODO: we can undo the following when stages api is updated with infothumbnail, infodescription ... other contentful data
        // newStages[findInx] = currStage;;
        newStages[findInx] = {
          ...currStage,
          infoThumbnail: prevState.serviceStages[findInx].infoThumbnail,
          infoDescription: prevState.serviceStages[findInx].infoDescription,
          homescreenContent: prevState.serviceStages[findInx].homescreenContent,
        };
        return {
          ...prevState,
          currentStage: currStage,
          serviceStages: newStages,
          isLoading: false,
        };
      });
      router.push({
        pathname: currStage.slug,
        query: { updated: 1 },
      });
    }
  };

  const updateStageBySlug = (slug: string, controller: AbortController) => {
    return new Promise(resolve => {
      const stage: StageData | undefined = state.serviceStages.find(
        item => item.slug === slug
      );
      if (stage?.sfStageName) {
        updateDashboardState({
          isLoading: true,
          currentStage: stage,
        });

        getStageByName(stage?.sfStageName || '', locale as string, controller)
          .then(response => {
            setState(prevState => {
              const findStageInx = prevState.serviceStages.findIndex(
                item => item.slug === slug
              );
              const newStages = [...prevState.serviceStages];

              // TODO: we can undo the following when stages api is updated with infothumbnail, infodescription ... other contentful data
              // newStages[findStageInx] =
              //   response.data.data.sfServiceCollection.items[0];
              newStages[findStageInx] = {
                ...response.data.data.sfServiceCollection.items[0],
                infoThumbnail: state.serviceStages[findStageInx].infoThumbnail,
                infoDescription:
                  state.serviceStages[findStageInx].infoDescription,
                homescreenContent:
                  state.serviceStages[findStageInx].homescreenContent,
              };

              return {
                ...prevState,
                serviceStages: newStages,
                currentStage: newStages[findStageInx],
                isLoading: false,
              };
            });
            resolve(true);
          })
          .catch(() => {});
      }
    });
  };

  /**
   * Fetch and store user info to context user state
   */
  const updateUserContext = async () => {
    updateDashboardState({
      userLoading: true,
    });
    try {
      const { data: meData } = (await getMe()).data;
      const preferredLanguage = getLocaleCode(
        meData?.userInfo?.preferredLanguage
      );
      setCookie(PREFERRED_LANG_COOKIE, preferredLanguage);

      // TODO: need to remove this after the middleware issue is fixed by Varcel
      // issue link: https://github.com/vercel/next.js/issues/49883
      // we do this redirection because because sometime user has diffrent locale in the url and in the cookie so we need to make sure that user has the same locale in the url and in the cookie
      if (locale !== preferredLanguage) {
        router.replace(router.asPath, undefined, { locale: preferredLanguage });
      }
      const showMissingPlotData = shouldShowMissingPlotModal(meData);
      const plotLocationSkipped = getCookie(SKIP_UPDATE_PLOT_LOCATION_COOKIE);
      if (showMissingPlotData && !plotLocationSkipped) {
        setShowMissingPlotLocation(true);
      }
      updateDashboardState({
        user: meData,
        userLoading: false,
      });

      setContextData({
        locale: preferredLanguage || 'ar',
      });

      return meData;
    } catch (err) {
      console.error(err);
      Router.push({ pathname: AppRoutes.Logout });
    }
  };

  const handleCloseSurvey = () => {
    setSurveyUrl('');
  };

  const onCloseMissingPlotModal = () => {
    setShowMissingPlotLocation(false);
    setCookie(SKIP_UPDATE_PLOT_LOCATION_COOKIE, 'true');
  };

  const shouldShowMissingPlotModal = (userProp?: IMe) => {
    const currentUser = userProp || user;

    return (
      currentUser?.isOnboardingComplete &&
      !currentUser?.userInfo?.plotInfo?.number
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        updateDashboardState,
        updateStageBySlug,
        updateCurrentStage,
        updateUserContext,
        isLoggedIn,
      }}
    >
      {showMissingPlotLocation && (
        <MissingPlotLocation onClose={onCloseMissingPlotModal} />
      )}
      {!missingPlotLocation && surveyUrl && (
        <SurveyModal
          url={surveyUrl}
          isOpen={!!surveyUrl}
          onClose={handleCloseSurvey}
        />
      )}

      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
