import {
  Component,
  Dispatch,
  ErrorInfo,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import AppError from '@/components/molecules/AppError/AppError';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: JSX.Element;
}

function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [router.pathname]);

  return (
    /**
     * when router pathname changes, this component will change the error state to false
     * and pass it to the child class component.
     * hence error is no longer on true state which allows us to navigate to other pages.
     */
    <ErrorBoundaryInner
      hasError={hasError}
      setHasError={setHasError}
      fallback={fallback}
    >
      {children}
    </ErrorBoundaryInner>
  );
}

export default ErrorBoundary;

interface Props {
  children?: ErrorBoundaryProps['children'];
  fallback?: ErrorBoundaryProps['fallback'];
  hasError: boolean;
  setHasError: Dispatch<SetStateAction<boolean>>;
}

class ErrorBoundaryInner extends Component<
  Props,
  { error: string; componentStack?: string }
> {
  state = {
    componentStack: '',
    error: '',
  };
  private checkVersion() {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(cookie => cookie.includes('versionCheck'));
    if (!cookie) {
      fetch('/api/version')
        .then(res => res.json())
        .then(data => {
          if (data.buildId !== process.env.NEXT_PUBLIC_SOURCE_VERSION) {
            document.cookie = 'versionCheck=true; max-age=300';
            window.location.reload();
          }
        });
    }
  }
  public componentDidCatch(_error: Error, errorInfo: ErrorInfo) {
    this.checkVersion();
    this.props.setHasError(true);
    this.setState({
      error: _error.message,
      componentStack: errorInfo.componentStack as string,
    });
  }

  public render() {
    const { children, hasError, fallback } = this.props;
    const { error, componentStack } = this.state;
    if (hasError) {
      return (
        fallback ?? (
          <AppError
            status={0}
            extraDetails={{ error, componentStack }}
            refresh={true}
          />
        )
      );
    }

    return children;
  }
}
