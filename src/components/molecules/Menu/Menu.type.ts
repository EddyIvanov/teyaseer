import { BaseSyntheticEvent } from 'react';

import { HeaderDataType } from '@/types/ContentFul.type';

export type MenuProps = {
  isScrolled: boolean;
  handleMenuToggle: () => void;
  data?: HeaderDataType;
  handleChangeLanguage: (e: BaseSyntheticEvent) => Promise<void>;
  handleLinkPress: () => void;
};

export type LoginProps = {
  href: string;
  target: string;
};
