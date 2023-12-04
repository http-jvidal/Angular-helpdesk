export interface User {
  id: Number;
  name: String;
  login: String;
  password: String;
  departament: {
    id: Number;
    name: String
  }
  ticket: {
    id: Number;
    detalhes: String;
    imagem: String;
    estado: boolean;
  }
}
