import { StageData } from '../../Stages/Stage.type';

export interface IRenderSteps {
  steps: StageData[];
  handleToggleMenu: () => void;
  currentSelected: number;
  setCurrentSelected: (index: number) => void;
  title: string;
}
