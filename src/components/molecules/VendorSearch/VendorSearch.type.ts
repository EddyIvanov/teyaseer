export type Vendor = {
  companyName: string;
  location: string;
  cityName: string;
  contactPhoneNumber: string;
  id: string;
  type: string;
};

interface VendorSearchProps {
  onSearchClick: (searchQuery: string) => void;
  searchResults: Vendor[];
  onVendorSelect: (vendor: Vendor) => void;
  isLoading: boolean;
}
export default VendorSearchProps;
