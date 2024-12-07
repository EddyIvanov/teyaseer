import { useContext, useEffect, useMemo, useState } from 'react';

import { Button, Portal } from '@chakra-ui/react';
import cx from 'classnames';
import { useRouter } from 'next/router';

import style from './BackToTop.style';
import { Container, Icon, Text } from '..';

import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';

const BackToTop = () => {
  const { t } = useTranslation();
  const { swiper } = useContext(Context);
  const [show, setShow] = useState(false);
  const [isFooterView, setIsFooterView] = useState(false);
  const router = useRouter();
  const cmpStyle = style({ show });
  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        const back_to_top = document.getElementById('back_to_top');
        if (!back_to_top) return;
        if (swiper.isEnd) {
          setIsFooterView(true);
        } else {
          setIsFooterView(false);
        }
        if (swiper.activeIndex === 0) {
          setShow(false);
        } else {
          setShow(true);
        }
      });
      return () => {
        swiper.off('slideChange');
        setShow(false);
      };
    } else {
      const handleScroll = () => {
        const back_to_top = document.getElementById('back_to_top');
        if (!back_to_top) return;
        const doc_height = document.body.offsetHeight;
        // check if we pas the 1/3 of the page
        if (window.scrollY > doc_height / 3) {
          setShow(true);
        } else {
          setShow(false);
        }
        // check if we are in footer area
        if (window.scrollY > doc_height - window.innerHeight - 110) {
          setIsFooterView(true);
        } else {
          setIsFooterView(false);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        setShow(false);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [swiper, setShow]);

  const isDashboard = useMemo(() => {
    return router.pathname.includes('/dashboard');
  }, [router.pathname]);

  const handleButtonClick = () => {
    if (swiper) {
      swiper.enable();
      swiper.allowSlidePrev = true;
      swiper.allowSlideNext = true;
      swiper.slideTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <Portal>
      <Container sx={cmpStyle.container}>
        <Button
          id="back_to_top"
          className={cx(isDashboard && 'dashboard', isFooterView && 'inFooter')}
          variant={'secondary'}
          sx={cmpStyle.button}
          onClick={handleButtonClick}
        >
          <Icon sx={cmpStyle.icon} name="arrowTop" />
          <Text as={'span'} sx={cmpStyle.text}>
            {t('scroll_to_top_btn')}
          </Text>
        </Button>
      </Container>
    </Portal>
  );
};
export default BackToTop;
