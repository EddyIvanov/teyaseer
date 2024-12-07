import ErrorBoundary from '@/components/layouts/ErrorBoundary';
import ChakraContext from '@/providers/ChakraContext';
import MainContext from '@/providers/MainContext';

interface IProvidersProps {
  children: React.ReactNode;
}
const Providers = (props: IProvidersProps) => {
  return (
    <ErrorBoundary>
      <ChakraContext>
        <MainContext>{props.children}</MainContext>
      </ChakraContext>
    </ErrorBoundary>
  );
};

export default Providers;
