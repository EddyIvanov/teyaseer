import { createStandaloneToast, defineStyle } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { NextRouter } from 'next/router';
import nookies from 'nookies';

import { isExternalUrl } from './isExternalUrl';

import { fileTypes } from '@/components/organism/dashboard/Documents/Document.constants';
import { replaceFileExtension } from '@/components/organism/dashboard/Documents/Document.helper';
import { getDocument } from '@/components/organism/dashboard/Documents/Documents.api';
import { DocumentFileExtension } from '@/components/organism/dashboard/Documents/Documents.types';
import useTranslation from '@/hooks/useTranslate';
import sizes from '@/styles/themes/brand/sizes';
import ToastNotificationStyle from '@/styles/themes/componentOverrides/ToastNotification';
import { UsersApiErrorResponseType } from '@/types/response.type';

export const reloadHomePage = (router: NextRouter) => {
  if (router.asPath === '/' || router.asPath === '/en') {
    router.reload();
  }
};

export const isURL = (url: string | unknown | undefined) => {
  if (!url) return false;
  if (typeof url === 'string') return /http|www|\./.test(url);
  return url;
};

interface IAnimationProps {
  type: 'slideUp' | 'slideDown' | 'blur' | 'slideLeft' | 'slideRight';
  duration?: string;
  perform?: boolean;
  easing?: string;
  delay?: string;
  customValue?: string | number;
}

const DEFAULT_DISTANCE = sizes.animationsDefaultDistance;
const DEFAULT_DISTANCE_SIDES = sizes.animationsDefaultDistanceSides;
const DEFAULT_OPACITY = 0.0001;

export const animationStyle = (props: IAnimationProps) => {
  const {
    type,
    duration = sizes.transitionDuration,
    perform = false,
    easing = 'ease-in-out',
    delay = 0.0,
    customValue,
  } = props;
  let data = {};

  switch (type) {
    case 'slideUp':
      data = {
        position: 'relative',
        transform:
          customValue || perform
            ? 'translate3d(0, 0, 0)'
            : `translate3d(0, -${DEFAULT_DISTANCE_SIDES}, 0)`,
        opacity: perform ? 1 : DEFAULT_OPACITY,
      };
      break;
    case 'slideDown':
      data = {
        position: 'relative',
        transform:
          customValue || perform
            ? 'translate3d(0, 0, 0)'
            : `translate3d(0, ${DEFAULT_DISTANCE_SIDES}, 0)`,
        opacity: perform ? 1 : DEFAULT_OPACITY,
      };
      break;
    case 'slideLeft':
      data = {
        position: 'relative',
        _ltr: {
          transform:
            customValue ||
            (perform
              ? 'translate3d(0, 0, 0)'
              : `translate3d(-${DEFAULT_DISTANCE}, 0, 0)`),
        },
        _rtl: {
          transform:
            customValue ||
            (perform
              ? 'translate3d(0, 0, 0)'
              : `translate3d(${DEFAULT_DISTANCE}, 0, 0)`),
        },
        opacity: perform ? 1 : DEFAULT_OPACITY,
      };
      break;
    case 'slideRight':
      data = {
        position: 'relative',
        _ltr: {
          transform:
            customValue ||
            (perform
              ? 'translate3d(0, 0, 0)'
              : `translate3d(${DEFAULT_DISTANCE}, 0, 0)`),
        },
        _rtl: {
          transform:
            customValue ||
            (perform
              ? 'translate3d(0, 0, 0)'
              : `translate3d(-${DEFAULT_DISTANCE}, 0, 0)`),
        },
        opacity: perform ? 1 : DEFAULT_OPACITY,
      };
      break;
    case 'blur':
      // data = {
      //   img: {
      //     filter: perform ? 'blur(0px)' : 'blur(10px)',
      //     transform: ' scale(1.1)',
      //     transitionDelay: delay,
      //     transitionDuration: duration,
      //     transitionProperty: 'all',
      //     transitionTimingFunction: easing,
      //   },
      // };
      break;
  }
  data = type !== 'blur' && {
    ...data,
    transitionDelay: delay,
    transitionDuration: duration,
    transitionTimingFunction: easing,
    transitionProperty: 'transform, opacity',
  };
  return defineStyle(data);
};

export const GetStaticErrorType = {
  ERR_CONTENTFUL_NOT_FOUND: 'error_content_not_found',
} as const;

export const normalizeGetStaticError = (error: any) => {
  if (error.type) {
    switch (error.type) {
      case GetStaticErrorType.ERR_CONTENTFUL_NOT_FOUND:
        return {
          error: {
            status: 0,
            title: 'error_contentful_title',
            message: 'error_contentful_message',
          },
        };
    }
  }
  if (!error.type && error.message) {
    const err = JSON.parse(error.message);
    return {
      error: {
        status: err.status,
        title: err.statusText,
        message: error.message,
      },
    };
  }
  return { error };
};

export const fetchUrlFromWindowPathName = (
  pathname: string,
  locale: string
): string => {
  if (pathname && locale) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.substring(3, pathname.length);
    }
    return pathname;
  }
  return '';
};

export const downloadFile = async (document: {
  Title: string;
  Id: string;
  FileExtension: DocumentFileExtension;
}) => {
  const response = (await getDocument(document.Id)).data;

  const fileType = fileTypes[document.FileExtension];

  const blob = new Blob([response], {
    type: fileType,
  });

  saveAs(blob, replaceFileExtension(document.Title, document.FileExtension));
};

export const fetchAppKeyValueFromErrorResponse = (
  errorResponse: UsersApiErrorResponseType
) => {
  let title = errorResponse?.error?.details?.errorCode?.appKey;
  if (title === undefined) {
    title = 'error.somethingWentWrong';
  }
  return useTranslation(false).t(title);
};

export const createCustomStandAloneToast = (title: string) => {
  createStandaloneToast({
    defaultOptions: {
      containerStyle: ToastNotificationStyle,
      isClosable: true,
      position: 'top',
      duration: null,
    },
  }).toast({
    title: title,
    status: 'error',
  });
};

export const normalizeLinkUrl = (url: string): string => {
  /// check if url not start with http or https add http to it
  if (!isExternalUrl(url)) {
    return `http://${url}`;
  }
  return url;
};

export const getCookie = (cname: string): string => {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
export const setCookie = (
  key: string,
  value: string,
  maxAge = 30 * 24 * 60 * 60
) => {
  nookies.set(null, key, value, {
    maxAge: maxAge,
    path: '/',
    secure: true,
    sameSite: 'Strict',
  });
};
export const deleteCookie = (key: string) => {
  nookies.destroy(null, key);
};
