import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import callAPI from "../../utils/apicall";

const Settings = ({ onClose }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [username, setUsername] = useState(user?.nickname || user?.email?.split("@")[0] || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUsernameChange = async () => {
    if (!isAuthenticated || !user || !username.trim()) return;

    setLoading(true);
    setSuccess(false);

    const { error } = await callAPI.rpc("update_username", {
      auth0_user_id: user.sub,
      new_username: username,
    });

    setLoading(false);
    if (!error) setSuccess(true);
    else console.error("Error updating username:", error);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-black">Settings</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-600">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="mt-4 text-center">
          {isLoading ? (
            <p className="text-black">Loading...</p>
          ) : isAuthenticated && user ? (
            <div className="flex flex-col items-center">
              <img
                src={user.picture}
                alt={user.name}
                className="w-20 h-20 rounded-full border-2 border-red-500 shadow-md"
              />
              <h2 className="text-lg font-semibold text-black mt-3">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-4 w-full p-2 border border-black bg-white rounded-lg text-black"
                placeholder="Enter new username"
              />

              <button
                onClick={handleUsernameChange}
                className="mt-3 w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Username"}
              </button>

              {success && <p className="text-green-500 mt-2">Username updated</p>}
            </div>
          ) : (
            <p className="text-black">Not logged in</p>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
            Change Password
          </button>
          <button className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-900 transition">
            Manage Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
