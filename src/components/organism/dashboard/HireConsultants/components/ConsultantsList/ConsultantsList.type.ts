import { IContactorType } from '../../../HireContractors/Contractors.type';

import { IConsultantType } from '@/components/organism/dashboard/HireConsultants/Consultants.type';

interface IConsultantList {
  onSelectConsultant: (items: IConsultantType[]) => void;
  maxSelectable?: number;
  minSelectable?: number;
  loading?: boolean;
  items: IConsultantType[];
  selectedItems: IConsultantType[] | IContactorType[];
  simpleMode?: boolean;
  withVirtualList?: boolean;
  containerStyle?: any;
  noDataMesage?: string;
}
export { type IConsultantList };
