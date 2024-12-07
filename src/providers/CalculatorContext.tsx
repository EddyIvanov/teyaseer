import { useRouter } from 'next/router';
import {
  CalculatorProvider,
  TLocaleType,
  envType,
} from 'teyaseer-calculator-engine';

export interface ICalculatorProps {
  children: React.ReactNode;
}
const CalculatorContext = ({ children }: ICalculatorProps) => {
  const { locale } = useRouter();
  return (
    <CalculatorProvider
      locale={(locale as TLocaleType) || 'ar'}
      spaceId={process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || ''}
      accessKey={process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || ''}
      env={process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT as envType}
      baseURL={process.env.NEXT_PUBLIC_COST_CALCULATOR_API_BASE_URL}
    >
      {children}
    </CalculatorProvider>
  );
};

export default CalculatorContext;
