import { PropsWithChildren } from 'react';

import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';

import style from './MenuDropdown.style';
import MenuDropdownProps from './MenuDropdown.type';

import { Icon } from '@/components';

const MenuDropdown = ({
  placeholderText,
  children,
}: PropsWithChildren<MenuDropdownProps>) => {
  return (
    <Menu autoSelect={false} preventOverflow boundary={'clippingParents'}>
      <MenuButton
        sx={style.customFilter}
        as={Button}
        variant="secondary"
        rightIcon={<Icon name="chevronDown" width={'18px'} height={'18px'} />}
      >
        {placeholderText}
      </MenuButton>
      <MenuList __css={style.customMenuList}>{children}</MenuList>
    </Menu>
  );
};

export default MenuDropdown;
