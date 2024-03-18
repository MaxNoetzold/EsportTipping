import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getMeApi from "../../../api/getMeApi";
import logoutApi from "../../../api/logoutApi";
import LoginButton from "./LoginButton";
import { useErrorSnackbar } from "../../ErrorSnackbar";
import useOnClickOutside from "../../../utils/useOnClickOutside";

function UserAvatar() {
  const queryClient = useQueryClient();
  const showError = useErrorSnackbar();
  const [showPopdown, setShowPopdown] = useState(false);
  const [logoutState, setLogoutState] = useState("idle");
  const popdownRef = useRef(null);

  const { data: user, error: userError } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMeApi,
  });

  useOnClickOutside(popdownRef, () => {
    setShowPopdown(false);
  });

  useEffect(() => {
    if (userError) {
      showError(userError.message);
    }
  }, [userError, showError]);

  const handleLogout = async () => {
    if (logoutState !== "loading") {
      setLogoutState("loading");
      await logoutApi();
      setLogoutState("idle");
      queryClient.resetQueries({ queryKey: ["user"] });
    }
  };

  const togglePopdown = () => {
    setShowPopdown(!showPopdown);
  };

  if (!user) {
    return <LoginButton />;
  }

  return (
    <div className="relative">
      <img
        src={`https://cdn.discordapp.com/avatars/${user.discordUserId}/${user.avatar}.png`}
        alt="User Avatar"
        className="w-12 h-12 rounded-full cursor-pointer"
        onClick={togglePopdown}
      />
      {showPopdown && (
        <div
          ref={popdownRef}
          className="absolute left-1/2 transform -translate-x-1/2 mt-0 bg-gray-900 text-white border border-gray-700 px-3 pb-2"
        >
          <a onClick={handleLogout} className="cursor-pointer">
            Logout
          </a>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
