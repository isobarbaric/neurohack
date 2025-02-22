import { User } from "./types/user";

export const Dashboard = ({ user }: { user: User }) => {
  return <div>Hello, {user.firstName}!</div>;
};
