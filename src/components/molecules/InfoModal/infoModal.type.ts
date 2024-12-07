import { IconNames } from '@/components/atoms/Icon/Icon';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: IconNames;
  title: string;
  info: string;
  href?: string;
  serviceRequestId?: string;
}

export default InfoModalProps;
