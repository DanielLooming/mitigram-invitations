export interface User {
    _id: string;
    picture: string;
    name: Name;
    company: string;
    email: string;
    phone: string;
    groups?: string[];
  }
  
  type Name = {
    first: string;
    last: string;
  };
  