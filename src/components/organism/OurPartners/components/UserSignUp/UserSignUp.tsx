import { Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

import styles from './UserSignUp.style';
import UserSignUpProps from './UserSignUp.type';

const UserSignUp = ({ signupInfo }: UserSignUpProps) => {
  return (
    <Flex __css={styles.vendorMoreInfoContainer}>
      <Text sx={styles.vendorMoreInfo}>{signupInfo.text}</Text>
      <Button as={Link} href={signupInfo.link.fields.href} variant="primary">
        {signupInfo.link.fields.label}
      </Button>
    </Flex>
  );
};

export default UserSignUp;
