import { useAuth } from "../store/auth";
export const About = () => {
    const {user} = useAuth();
  return (
    <>
      <h1>Hi {user ?  `${user.username}` : "there"}</h1>
    </>
  );
};
