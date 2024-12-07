import { Text } from '@chakra-ui/react';

export const makeWordsBold = (
  title: string,
  boldStart: number,
  boldEnd: number
) => {
  const words = title.split(' ');
  boldStart = Math.max(0, Math.min(words.length - 1, boldStart));
  boldEnd = Math.max(boldStart, Math.min(words.length - 1, boldEnd));

  return (
    <>
      {words.map((word, index) => {
        const isBold = index >= boldStart && index <= boldEnd;
        return isBold ? (
          <Text as="span" fontWeight="semibold" key={index}>
            {word}
            {index < words.length - 1 ? ' ' : ''}{' '}
          </Text>
        ) : (
          <Text as="span" key={index}>
            {word}
            {index < words.length - 1 ? ' ' : ''}{' '}
          </Text>
        );
      })}
    </>
  );
};
