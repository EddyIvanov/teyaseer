import OnboardingArticle from './components/OnboardingArticle';
import OnboardingSearchConsultant from './components/OnboardingSearchConsultant';
import OnboardingSingleChoice from './components/OnboardingSingleChoice';

export enum ONBOARDING_STEPS {
  START_STATE = 'StartState',
  SINGLE_CHOICE = 'SingleChoice',
  CONSULTANT_SEARCH = 'ConsultantSearch',
  END_STATE = 'EndState',
}

const ONBOARDING_RENDERINGS: Record<string, any> = {
  [ONBOARDING_STEPS.START_STATE]: OnboardingArticle,
  [ONBOARDING_STEPS.SINGLE_CHOICE]: OnboardingSingleChoice,
  [ONBOARDING_STEPS.CONSULTANT_SEARCH]: OnboardingSearchConsultant,
  [ONBOARDING_STEPS.END_STATE]: OnboardingArticle,
};

export default ONBOARDING_RENDERINGS;
