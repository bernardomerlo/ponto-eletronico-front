export type UserRole = "employee" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
