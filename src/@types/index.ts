type Role = "ADMIN" | "USER";

export type UserData = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Status = "PENDENTE" | "CANCELADO" | "CONECTADO";
export type DataOrder = {
  id: string;
  number: number;
  local: string;
  schedulingDate: string;
  schedulingTime: string;
  price: number;
  status: Status;
  contact: string;
  createdAt: string;
  updatedAt: string;
};
