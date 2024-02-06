export interface User {
    _id: string;
    picture: string;
    name: Name;
    company: string;
    email: string;
    phone: string;
    groups?: string[];
  }
  
  class Name {
    first!: string;
    last!: string;
  };
  