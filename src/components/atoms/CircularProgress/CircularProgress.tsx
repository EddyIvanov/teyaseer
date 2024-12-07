import {
  CircularProgress as ChakraCircularProgress,
  CircularProgressLabel,
  CircularProgressProps,
} from '@chakra-ui/react';

const CircularProgress = ({ value, ...rest }: CircularProgressProps) => {
  return (
    <ChakraCircularProgress
      thickness="8px"
      color="success"
      value={value}
      {...rest}
    >
      <CircularProgressLabel>{`${value}%`}</CircularProgressLabel>
    </ChakraCircularProgress>
  );
};

export default CircularProgress;
