import { IConsultantType } from '../../Consultants.type';

interface IBucketListProps {
  vendorList: IConsultantType[];
  updateContextState: (data: any) => void;
  vendorType?: string;
  onClear?: () => void;
  onSelectedChange?: (items: IConsultantType[]) => void;
}

export default IBucketListProps;
