import { CalculatorQuestion } from 'teyaseer-calculator-engine';

export enum ProjectStatus {
  ON_GOING = 'Ongoing',
  ON_HOLD = 'On Hold',
}

export interface IUserLoginPreCheck {
  isEligible: boolean;
  isUAEPassUpgraded: boolean;
  preferredLanguage: string;
}

export const PREFERRED_AR = 'Arabic';
export const PREFERRED_EN = 'English';

export type PreferredLanguageTypes = typeof PREFERRED_AR | typeof PREFERRED_EN;

export interface IOnboardingQuestions {
  id: string;
  selectedOptionId: string;
  nextQuestionId: string;
  index: number;
}

export interface IProjectInfo {
  stage: string;
  phase: string | null;
  projectStartDate: string | null;
  estimatedStartDate: string | null;
  estimatedEndDate: string | null;
  projectOnHoldDate: string | null;
  projectStatus: ProjectStatus;
  onHoldReason: string | null;
  reasonForPuttingOnHold: string | null;
}

export interface ILoanInfo {
  acceptedLoanAmount: number | null;
  additionalFunds: number | null | string;
  totalFunds: number | null;
  nhlsNumbers: number | null;
}

export interface IPlotInfo {
  id: string | null;
  size: number | null;
  number: string | null;
  address: string | null;
  plotLatitude: number | null;
  plotLongitude: number | null;
  preDesignedVillaId: string | null;
  plotLocation: string | null;
  municipality: string | null;
  districtZone: string | null;
}

export interface IUser {
  accountId: string;
  emiratesId: string;
  nameEn: string;
  nameAr: string;
  contactNumber: string;
  alternativeContactNumber: string | null;
  nationality: string;
  gender: string;
  email: string;
  preferredLanguage: PreferredLanguageTypes;
  isPersonOfDetermination: boolean;
  projectInfo: IProjectInfo;
  loanInfo: ILoanInfo;
  plotInfo: IPlotInfo;
}

export interface ICalculatorTabs {
  id: string;
  cfId: string;
  title: string;
  isActive: boolean;
  tabDisplayPictureURLDefault: null | string;
  tabDisplayPictureURLWithPlaceholders: null | string;
  orderIndex: number;
  imageGroup: string;
  calculatorInstanceId: string;
  createdAt: string;
  updatedAt: string;
  calculatorQuestions: CalculatorQuestion[];
}

export interface IMe {
  userInfo: IUser;
  isOnboardingComplete: boolean;
  onboardingStepsCompleted: {
    onBoardingQuestions: IOnboardingQuestions[];
  };
  latestCalculatorInstance?: {
    calculatorTabs: Array<ICalculatorTabs> | null;
    id: string;
  };
  personOfDeterminationMeetingStatus: boolean;
  isSupportServiceRequestInitiated: boolean;
}
