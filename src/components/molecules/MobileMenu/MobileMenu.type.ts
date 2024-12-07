import { BaseSyntheticEvent } from 'react';

import { HeaderDataType } from '@/types/ContentFul.type';

export type MobileMenuProps = {
  isOpen: boolean;
  handleMenuToggle: () => void;
  data?: HeaderDataType;
  handleChangeLanguage: (e: BaseSyntheticEvent) => Promise<void>;
  handleLinkPress: () => void;
};
