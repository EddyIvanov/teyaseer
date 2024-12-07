import { ModalProps, SystemStyleObject } from '@chakra-ui/react';

interface IModalProps extends ModalProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  contentStyle?: SystemStyleObject;
  isTitleCentered?: boolean;
}
export default IModalProps;
