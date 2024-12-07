import { useContext, useEffect, useMemo, useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { StageData } from '@/components/organism/dashboard/Stages/Stage.type';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';

export default function useStageData(slug: string) {
  const { serviceStages, isLoading, updateStageBySlug } =
    useContext(DashboardContext);
  const { locale } = useContext(Context);
  const [stage, setStage] = useState<StageData | undefined>(undefined);
  const { isOpen: isRefech, onToggle } = useDisclosure();
  const router = useRouter();
  const { updated } = useRouter().query;

  useEffect(() => {
    const controller = new AbortController();
    if (slug && serviceStages.length && !updated) {
      updateStageBySlug(slug, controller);
    } else {
      router.push(router.asPath.replace('?updated=1', ''), undefined, {
        shallow: true,
      });
    }
    return () => {
      if (!controller.signal.aborted) {
        controller.abort();
      }
    };
  }, [slug, serviceStages.length, isRefech, locale]);

  useEffect(() => {
    if (serviceStages.length === 0) return;
    const stage = serviceStages.find(stage => stage.slug === slug);
    if (stage) {
      setStage(stage);
    }
  }, [serviceStages, slug]);

  const reloadData = () => {
    onToggle();
  };

  const isLoadingData = useMemo(() => {
    const stage = serviceStages.find(stage => stage.slug === slug);
    if (isLoading && stage?.optionsCollection) {
      return 'soft';
    }
    return isLoading ? 'hard' : 'none';
  }, [isLoading, serviceStages]);

  return {
    stage,
    isSoftLoading: isLoadingData === 'soft',
    isHardLoading: isLoadingData === 'hard',
    isLoading,
    reloadData,
  };
}
