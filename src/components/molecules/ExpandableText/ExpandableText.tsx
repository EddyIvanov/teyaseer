import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Button, Text } from '@chakra-ui/react';

import useTranslation from '@/hooks/useTranslate';
import FontSizes from '@/styles/themes/brand/fontSizes';

type ExpandableTextProps = {
  text: string;
  initialNumberOfLine: number;
};
function ExpandableText({ text, initialNumberOfLine }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const checkOverflow = useCallback(() => {
    const { clientHeight, scrollHeight } = textRef.current as HTMLDivElement;
    setLineHeight(
      parseFloat(
        window.getComputedStyle(textRef.current as HTMLElement).lineHeight
      ) * initialNumberOfLine
    );
    setIsOverflow(scrollHeight > clientHeight);
  }, []);

  useEffect(() => {
    checkOverflow();
  }, [textRef.current?.clientHeight, checkOverflow]);

  return (
    <>
      <Text
        ref={textRef}
        sx={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          maxH: isExpanded ? 'none' : lineHeight,
        }}
      >
        {text}
      </Text>
      {isOverflow && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant={'link'}
          sx={{
            fontsize: FontSizes.small,
            textTransform: 'unset',
            marginTop: '12px',
          }}
        >
          {isExpanded ? t('portal_show_less') : t('portal_show_more')}
        </Button>
      )}
    </>
  );
}

export default ExpandableText;
