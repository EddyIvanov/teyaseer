import Client from '@/lib/contentFul';
import { vendorsApi, usersApi } from '@/services/api';

export const getOnboardingQuestionById = async (id: string, locale: string) => {
  return Client.getEntries({
    content_type: 'onboardingQuestions',
    'sys.id': id,
    locale: locale,
    include: 5,
  })
    .then(response => response.items[0])
    .catch(err => {
      console.error(err);
    });
};

export const searchConsultant = async (search?: string) => {
  return vendorsApi.get('/vendors', {
    params: {
      search,
      type: 'Teyaseer Consultants',
    },
  });
};

export const saveSelectedVendor = async (awardedConsultantId: string) => {
  return usersApi.post(
    `/users/service-requests/award-prequalified-consultant?awardedConsultantId=${awardedConsultantId}`
  );
};

export const saveOnboardingChoices = (selectedChoices: any) => {
  return usersApi.post('/users/soft-onboarding', {
    onBoardingQuestions: selectedChoices,
  });
};

export const updateOnboardingStatus = () => {
  return usersApi.patch('/users/me', {
    isOnboardingComplete: true,
  });
};
