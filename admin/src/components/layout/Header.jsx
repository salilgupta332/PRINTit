import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="font-semibold text-lg">Admin Panel</h2>

      <div className="space-x-4">
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-600 font-medium"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Sign up
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
