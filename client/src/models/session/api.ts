import axios from "axios";

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const data = await axios.post(
    "http://localhost:3001/signin",
    {
      username,
      password,
    },
    { withCredentials: true }
  );
  return data;
};
