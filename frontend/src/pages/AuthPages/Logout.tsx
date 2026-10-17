import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // Remove common locally stored authentication values.
        // We will adjust these once we confirm your exact auth implementation.
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("auth");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("auth");
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        // User should not be able to go "Back" into logout.
        navigate("/signin", { replace: true });
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <svg
            className="h-6 w-6 animate-spin text-gray-700 dark:text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>

        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Signing you out
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Your SprintFlow session is being closed securely.
        </p>
      </div>
    </div>
  );
}