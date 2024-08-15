export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  contato: string;
  departamento: {
    id: number;
    name: string;
  };
  roles: string[];
}
