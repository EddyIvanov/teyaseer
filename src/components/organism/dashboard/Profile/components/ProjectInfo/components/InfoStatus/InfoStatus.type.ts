import { ProjectStatus } from '@/types/user.type';

export interface InfoStatusProps {
  status: ProjectStatus;
  onClick?: () => void;
}
