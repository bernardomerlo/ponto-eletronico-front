import { User } from "./user";

export type Registro = {
  id: string;
  type: "check-in" | "check-out";
  timestamp: string;
  user: User;
};
