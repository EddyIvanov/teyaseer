const UAE_PASS_INITIALIZED = 'UaePassInitiated';

export function useUAEPassSession() {
  const initiateUAE = (status: boolean) => {
    if (status) {
      sessionStorage.setItem(UAE_PASS_INITIALIZED, 'true');
    } else {
      sessionStorage.removeItem(UAE_PASS_INITIALIZED);
    }
  };

  const isUaeInitated = (): boolean => {
    return !!sessionStorage.getItem(UAE_PASS_INITIALIZED);
  };

  return {
    initiateUAE,
    isUaeInitated,
  };
}
