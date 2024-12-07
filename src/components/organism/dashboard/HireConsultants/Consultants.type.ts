export type ConsultantCustomerReview = {
  createdDate: string;
  responseRating: number;
  responseText: string;
  vendorId: string;
};
export interface IConsultantType {
  id: string;
  companyName: string;
  companyNameAr?: string;
  type?: string;
  typeAr?: string;
  location?: string;
  locationAr?: string;
  ratings?: number | string;
  completedProjects?: string;
  ongoingProjects?: string;
  established?: string;
  numberOfStaff?: string;
  cityName?: string;
  contactPhoneNumber?: string;
  companyEmail?: string;
  companyWebsite?: string;
  classification?: string;
  city?: string;
  ongoingProjectNumber?: number;
  completedProjectNumber?: number;
  preferredLocation?: string;
  preferredLocationAr?: string;
  establishmentDate?: string;
  registeredAddress?: string;
  offeredServices?: IConsultantOfferedServices[];
  customerReviews: ConsultantCustomerReview[];
  vendorLogoId: string | null;
}
export interface IConsultantOfferedServices {
  interiorDesignServices: boolean | null;
  providesPrecastConstruction: boolean | null;
  provideslandscapingDesign: boolean | null;
  swimmingPoolDesign: boolean | null;
  usesGalvanisedIron: boolean | null;
  usesSubContractors: boolean | null;
  id: string;
  overallRating: number | null;
  subContractorServicesUsage: [];
}

export interface IConsultantContextProps {
  children: React.ReactNode;
}
export interface IConsultantState {
  serviceRequestId: string;
  vendors: IConsultantType[];
  bidderList: IConsultantType[];
  yourVision: string;
  minSelected: number;
  maxSelected: number;
}
export interface IConsultantContextReturnType {
  vendors: IConsultantType[];
  bidderList: IConsultantType[];
  yourVision: string;
  serviceRequestId: string;
  minSelected: number;
  maxSelected: number;
  setData: (data: any) => void;
  updateContextState: (state: Partial<IConsultantState>) => void;
}
