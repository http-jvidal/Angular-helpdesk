export interface Ticket {

      id: number;
      nome: string;
      detalhes: string;
      contato: any;
      departamento: any;
      user: {
        id: Number;
        name: string;
        username: string;
        password: string;
        contato: any;
      }

      roles: string;
}
