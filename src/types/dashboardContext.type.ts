import { IMe } from './user.type';

import {
  StageData,
  StageStatusMappingType,
} from '@/components/organism/dashboard/Stages/Stage.type';

export interface IDashboardContextReturnType extends IDashboardContextState {
  updateDashboardState: (state: Partial<IDashboardContextState>) => void;
  isLoggedIn: () => boolean;
  updateStageBySlug: (slug: string, controller: AbortController) => void;
  updateCurrentStage: (controller: AbortController) => void;
  updateUserContext: () => Promise<IMe | undefined>;
}

export interface IDashboardContextProps {
  children: React.ReactNode;
}

export interface IDashboardContextState {
  user: IMe | undefined;
  serviceStages: StageData[];
  currentStage?: StageData;
  lastStage?: StageData;
  stageStatusMapping: StageStatusMappingType;
  isLoading: boolean;
  userLoading: boolean;
}
