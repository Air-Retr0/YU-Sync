import { useAuth0 } from "@auth0/auth0-react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="flex w-full items-center gap-2 text-left hover:text-red-600 transition-colors" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <FaSignOutAlt /> Log Out
    </button>
  );
};

export default LogoutButton;