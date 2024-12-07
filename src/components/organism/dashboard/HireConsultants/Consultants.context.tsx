import React, { createContext } from 'react';

import {
  IConsultantContextProps,
  IConsultantContextReturnType,
  IConsultantState,
} from './Consultants.type';

export const ConsultantContext = createContext<IConsultantContextReturnType>(
  {} as IConsultantContextReturnType
);

const ConsultantProvider = (props: IConsultantContextProps) => {
  const { children } = props;
  const [data, setData] = React.useState<IConsultantState>({
    serviceRequestId: '',
    vendors: [],
    bidderList: [],
    yourVision: '',
    minSelected: 3,
    maxSelected: 10,
  });

  const updateContextState = (state: Partial<IConsultantState>) => {
    setData(prevState => ({
      ...prevState,
      ...state,
    }));
  };
  return (
    <ConsultantContext.Provider
      value={{ ...data, setData, updateContextState }}
    >
      {children}
    </ConsultantContext.Provider>
  );
};

export default ConsultantProvider;
