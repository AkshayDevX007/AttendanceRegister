export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  unitName: string;
  attendance: {
    year: number;
    totalPercentage: number;
  }[];
}
