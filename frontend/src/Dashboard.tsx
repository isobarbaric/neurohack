import { User } from "./types/user";
import NavBar from "./components/NavBar";

export const Dashboard = ({ user }: { user: User }) => {
  return (
    <div>
      <NavBar />
      <div>Hello, {user.firstName}!</div>
    </div>
  );
};
