import { ProjectStatus } from '@/types/user.type';

const isProjectOnHold = (projectStatus: ProjectStatus | undefined): boolean => {
  return projectStatus === ProjectStatus.ON_HOLD;
};

export const StatusProject = {
  isOnHold: isProjectOnHold,
};
