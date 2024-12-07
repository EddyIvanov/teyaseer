import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { getTheme } from '@/helpers/getTheme';
import ToastNotificationStyle from '@/styles/themes/componentOverrides/ToastNotification';

export interface IChakraContextProps {
  children: React.ReactNode;
}

const ChakraContext = ({ children }: IChakraContextProps) => {
  const { locale } = useRouter();
  const theme = getTheme(locale);

  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          containerStyle: ToastNotificationStyle,
          isClosable: true,
          position: 'top',
        },
      }}
      theme={theme}
    >
      {children}
    </ChakraProvider>
  );
};

export default ChakraContext;
