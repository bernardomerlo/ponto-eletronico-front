import { UserRole } from "./user";

type JwtPayload = {
  sub: string;
  id: string;
  name: string;
  email: string;
  role: UserRole;
  exp: number;
};

export default JwtPayload;
