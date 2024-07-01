export interface User {
  id: Number;
  name: string;
  username: string;
  password: string;
  contato: any;
  departamento: {
    id: Number;
    name: string;
  }
  roles: string;
}
