import { useQuery } from "@tanstack/react-query";
import getMeApi from "../../../api/getMeApi";
import LoginButton from "./LoginButton";

function UserAvatar() {
  const { data } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMeApi,
  });

  if (!data) {
    return <LoginButton />;
  }

  console.log(data);

  return <LoginButton />;
}

export default UserAvatar;
