const AppRoutes = {
  Dashboard: {
    Home: '/dashboard',
    Supports: {
      Index: '/dashboard/supports',
      Search: '/dashboard/supports/search',
    },
    Services: {
      Index: '/dashboard/services',
      Description: '/dashboard/services/:id/description',
      VillaConfigurator: {
        Index: '/dashboard/services/villa-configurator',
        Summary: '/dashboard/services/villa-configurator/summary',
      },
      UploadDocuments: '/dashboard/services/upload-documents',
      YourRequirements: '/dashboard/services/your-requirements',
      SelectVilla: {
        Index: '/dashboard/services/select-villa',
        VillaId: '/dashboard/services/select-villa/:id',
      },
      SelectContractor: '/dashboard/services/select-contractor',
      SelectConsultant: '/dashboard/services/select-consultant',
      HireConsultant: {
        Index: '/dashboard/services/hire-consultant',
        List: '/dashboard/services/hire-consultant/list',
        YourVision: '/dashboard/services/hire-consultant/your-vision',
        Additional: '/dashboard/services/hire-consultant/additional',
        AddConsultant: '/dashboard/services/hire-consultant/add-consultant',
        Confirmation: '/dashboard/services/hire-consultant/confirmation',
        UploadDocuments: '/dashboard/services/hire-consultant/upload-documents',
      },
      HireContractor: {
        Index: '/dashboard/services/hire-contractor',
        List: '/dashboard/services/hire-contractor/list',
        Additional: '/dashboard/services/hire-contractor/additional',
        AddContractor: '/dashboard/services/hire-contractor/add-contractor',
        Confirmation: '/dashboard/services/hire-contractor/confirmation',
      },
    },
    MyProfile: '/dashboard/my-profile',
    MyDocuments: '/dashboard/my-documents',
    Clendar: '/dashboard/calendar',
  },
  Home: '/',
  OurPartners: '/our-partners',
  SupportSearchPage: '/support-search-page',
  FindQualifiedVendors: '/find-qualified-vendors',
  villaList: '/villa-list',
  Signup: {
    Customer: '/sign-up/customer',
    NonUpgraded: '/sign-up-non-upgraded',
  },
  Vendor: '/vendor',
  Support: {
    Index: '/support',
    articlesId: '/support/articles/:id',
  },
  TermsAndConditions: '/terms-and-conditions',
  VillaConfigurations: {
    Index: '/villa-configurator',
    Summary: '/villa-configurator/summary',
  },
  Services: '/services',
  NonEligible: '/non-eligible',
  OurStory: '/our-story',
  BeInspired: '/be-inspired',
  Villas: {
    Id: '/villas/:id',
  },
  Authenticate: '/authenticate',
  Logout: '/logout',
} as const;

export default AppRoutes;
