import { SystemStyleObject } from '@chakra-ui/react';

interface ArticleProps {
  style: Record<string, SystemStyleObject>;
  backgroundImageNode: React.ReactNode;
  titleNode?: React.ReactNode;
  descriptionNode: React.ReactNode;
  id?: string;
}

export default ArticleProps;
