import { IConsultantType } from '../HireConsultants/Consultants.type';

export interface IContactorType extends IConsultantType {}

export interface IContactorContextProps {
  children: React.ReactNode;
}
export interface IContactorState {
  serviceRequestId: string;
  bidderList: IContactorType[];
  vendors: IContactorType[];
  minSelected: number;
  maxSelected: number;
}
export interface IContactorContextReturnType {
  vendors: IContactorType[];
  bidderList: IContactorType[];
  minSelected: number;
  maxSelected: number;
  serviceRequestId: string;
  setData: (data: any) => void;
  updateContextState: (state: Partial<IContactorState>) => void;
}
