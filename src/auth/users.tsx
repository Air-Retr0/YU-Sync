import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import callAPI from "../utils/apicall";

const UserSync = () => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const syncUser = async () => {
      const { error } = await callAPI.rpc("sync_auth0_user", {
        auth0_user_id: user.sub,
        user_email: user.email,
        user_name: user.nickname || user.email.split("@")[0],
      });

      if (error) console.error("Error syncing user:", error);
    };

    syncUser();
  }, [isAuthenticated, user]);

  return null;
};

export default UserSync;
