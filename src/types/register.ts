import { User } from "./user";

export type Registro = {
  id: string;
  type: "check_in" | "check_out";
  timestamp: string;
  user: User;
};
