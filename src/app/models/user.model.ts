export interface User {
    _id: string;
    picture: string;
    name: Name;
    email: string;
    company: string;
    phone: string;
    groups?: string[];
  }
  
  class Name {
    first!: string;
    last!: string;
  };
  