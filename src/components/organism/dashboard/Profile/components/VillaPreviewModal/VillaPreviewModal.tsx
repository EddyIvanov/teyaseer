import React from 'react';

import { Flex } from '@chakra-ui/react';

import style from './VillaPreviewModal.style';

import { Modal, Image } from '@/components';

interface VillaPreviewModalProps {
  imageUrl: string;
  isShowingPreview: boolean;
  togglePreviewImageModal: () => void;
}

const VillaPreviewModal = ({
  imageUrl,
  isShowingPreview,
  togglePreviewImageModal,
}: VillaPreviewModalProps) => {
  return (
    <Modal isOpen={isShowingPreview} onClose={togglePreviewImageModal}>
      <Flex sx={style.imageContainer}>
        <Image
          lazyLoadTheme={'light'}
          src={imageUrl}
          alt={'Villa Preview Image'}
          className="villaImage"
          fill
        />
      </Flex>
    </Modal>
  );
};

export default VillaPreviewModal;
