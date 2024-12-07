import { IConsultantType } from '../../Consultants.type';

interface IAdditionalVendor {
  title: string;
  description: string;
  updateContextState: (data: any) => void;
  vendors: IConsultantType[];
  maxSelected: number;
  minSelected: number;
  vendorType: string;
}
export { type IAdditionalVendor };
