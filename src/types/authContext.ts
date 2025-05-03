import { User } from "./user";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  signOut: () => void;
};
export default AuthContextType;
