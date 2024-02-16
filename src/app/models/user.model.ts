export interface User {
  id: Number;
  name: String;
  username: String;
  password: String;
  departamento: {
    id: Number;
    name: String;
  }
  ticket: {
    id: Number;
    name: String;
    estado: boolean;
    imagem: String;
    url: String;
    detalhes: String
  }
}
