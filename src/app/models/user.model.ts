export interface User {
  id: Number;
  name: String;
  username: String;
  password: String;
  departamento: {
    id: Number;
    name: String;
  }
  roles: String;
 
}
