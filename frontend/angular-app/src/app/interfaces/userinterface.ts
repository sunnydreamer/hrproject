export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    streetLine2: string;
  }
  
  export interface Phone {
    cell: string;
    work: string;
  }
  
  export interface CarInfo {
    make: string;
    model: string;
    color: string;
  }
  
  export interface Visa {
    visaTitle: string;
    startDate: Date | null;
    endDate: Date | null;
  }
  
  export interface DriversLicense {
    licenseNumber: string;
    expirationDate: Date | null;
    licenseImage: string;
  }
  
  export interface Opt {
    receipt: string | null;
    ead: string | null;
    i983: string | null;
    i20: string | null;
  }
  
  export interface Reference {
    firstName: string;
    middleName: string;
    lastName: string;
    preferredName: string;
    phone: string;
    email: string;
    relationship: string;
  }
  
  export interface Person {
    address: Address;
    phone: Phone;
    carInfo: CarInfo;
    visa: Visa;
    driversLicense: DriversLicense;
    opt: Opt;
    reference: Reference;
    _id: string;
    regToken: string | null;
    regLinkToken: string | null;
    firstName: string;
    lastName: string;
    middleName: string;
    preferredName: string;
    onboardingStatus: string;
    profilePicture: string;
    email: string;
    ssn: string;
    dob: Date;
    gender: string;
    emergencyContact: string[];
    username: string;
    password: string;
    isHR: boolean;
    hasDriversLicense: boolean;
    workAuthorization: string;
    workAuthorizationStart: Date | null;
    workAuthorizationEnd: Date | null;
    timestamp: Date;
    __v: number;
  }