import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import style from './Modal.style';
import IModalProps from './Modal.type';

const BaseModal = ({
  title,
  children,
  isOpen,
  onClose,
  footer,
  showCloseButton = true,
  closeOnOverlayClick = true,
  size,
  contentStyle,
  isTitleCentered,
  ...rest
}: IModalProps) => {
  const modalStyle = style({ showCloseButton, size });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={closeOnOverlayClick}
        isCentered
        size={size}
        {...rest}
      >
        <ModalOverlay />
        <ModalContent
          data-title={!!title}
          sx={{ ...modalStyle.root, ...contentStyle }}
        >
          {!!title && (
            <ModalHeader sx={modalStyle.header}>
              <Flex
                sx={modalStyle.headerInnerContainer}
                data-title-center={!!isTitleCentered}
              >
                {title}
              </Flex>
            </ModalHeader>
          )}
          {showCloseButton && <ModalCloseButton sx={modalStyle.closeButton} />}
          <ModalBody>{children}</ModalBody>
          {footer && <ModalFooter sx={modalStyle.footer}>{footer}</ModalFooter>}
        </ModalContent>
      </Modal>
    </>
  );
};
export default BaseModal;
