import { ILoanInfo, IUser, IPlotInfo } from '@/types/user.type';

export interface IMeUpdate {
  userInfo: {
    alternativeContactNumber?: IUser['alternativeContactNumber'];
    isPersonOfDetermination?: IUser['isPersonOfDetermination'];
    preferredLanguage?: IUser['preferredLanguage'];
    loanInfo?: {
      additionalFunds?: ILoanInfo['additionalFunds'];
    };
    plotInfo?: {
      preDesignedVillaId?: IPlotInfo['preDesignedVillaId'];
      visionForDreamHome?: string;
      plotLatitude?: number;
      plotLongitude?: number;
      plotLocation?: string;
      size?: number;
      id?: string;
    };
  };
}

export type T_VillaDetailsRes = {
  ['villa style']?: string;
  villaSize?: string;
  villaTitle?: string;
  imgSrc?: string;
  detailsPath?: string;
  bedrooms?: string;
  bathrooms?: string;
};

export type T_ParseVillaDetails = {
  villaStyle?: string;
  villaSize?: string;
  villaTitle?: string;
  imgSrc?: string;
  detailsPath?: string;
  bedrooms?: string;
  bathrooms?: string;
};

export interface IVendor {
  clientId: string | null;
  companyEmail: string | null;
  companyName: string | null;
  companyNameAr: string | null;
  companyWebsite: string | null;
  contactNumber: string | null;
  id: string;
  managerName: string | null;
  registeredAddress: string | null;
}

export interface IAwardedVendors {
  awardedConsultant: IVendor;
  awardedContractor: IVendor;
}
