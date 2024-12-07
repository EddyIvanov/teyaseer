import { ReactNode, useEffect } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './AppError.style';

import { Container, Icon, Section } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

interface IAppErrorProps {
  status?: number;
  errorTitle?: string;
  errorDescription?: ReactNode | string;
  errorButton?: ReactNode;
  redirectUrl?: string;
  extraDetails?: { error: string; componentStack?: string };
  refresh?: boolean;
}

const AppError = (props: IAppErrorProps) => {
  const {
    status = 0,
    errorTitle = 'error_boundary_title',
    errorDescription = 'error_boundary_description',
    refresh,
    extraDetails,
  } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const reloadPage = () => {
    router.reload();
  };

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      const currentFooterPosition = footer?.style.position;
      footer?.style.setProperty('position', 'relative');
      return () => {
        footer?.style.setProperty('position', currentFooterPosition);
      };
    }
  }, []);

  return (
    <Section
      sx={{
        top: { base: '62px', xl: '50px' },
        minH: 'calc(100vh - 100px)',
        h: '100%',
        justifyContent: 'center',
      }}
    >
      <Container>
        <Box __css={styles} textAlign="center">
          {status > 1 && <h1 className="title">{status}</h1>}
          <h3 className="subTitle">{t(errorTitle)}</h3>
          {typeof errorDescription === 'string' ? (
            <h4 className="errorDescription">{t(errorDescription)}</h4>
          ) : (
            <h4 className="errorDescription">{errorDescription}</h4>
          )}
          {refresh ? (
            <Button
              onClick={reloadPage}
              leftIcon={<Icon name="refresh" />}
              variant="primary"
            >
              {t('reload_page')}
            </Button>
          ) : (
            <Button
              as={Link}
              href="/"
              leftIcon={<Icon name="arrowBack" />}
              variant="primary"
            >
              {t('go_back_to_home')}
            </Button>
          )}
        </Box>
        {extraDetails && (
          <Accordion variant="noOutline" allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="start"
                    color={colors.error}
                  >
                    {t(extraDetails.error)}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {extraDetails.componentStack && (
                <AccordionPanel pb={4}>
                  <Box as="pre" textAlign={'left'}>
                    {t(extraDetails.componentStack)}
                  </Box>
                </AccordionPanel>
              )}
            </AccordionItem>
          </Accordion>
        )}
      </Container>
    </Section>
  );
};

export default AppError;
