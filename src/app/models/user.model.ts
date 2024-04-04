export interface User {
  id: Number;
  name: string;
  username: string;
  password: string;
  departamento: {
    id: Number;
    name: string;
  }
  roles: string;
 
}
