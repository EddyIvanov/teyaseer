import React, { createContext } from 'react';

import {
  IContactorContextProps,
  IContactorContextReturnType,
  IContactorState,
} from './Contractors.type';

export const ContractorContext = createContext<IContactorContextReturnType>(
  {} as IContactorContextReturnType
);

const ContactorProvider = (props: IContactorContextProps) => {
  const { children } = props;
  const [data, setData] = React.useState<IContactorState>({
    serviceRequestId: '',
    vendors: [],
    bidderList: [],
    minSelected: 3,
    maxSelected: 10,
  });

  const updateContextState = (state: Partial<IContactorState>) => {
    setData(prevState => ({
      ...prevState,
      ...state,
    }));
  };

  return (
    <ContractorContext.Provider
      value={{ ...data, setData, updateContextState }}
    >
      {children}
    </ContractorContext.Provider>
  );
};

export default ContactorProvider;
