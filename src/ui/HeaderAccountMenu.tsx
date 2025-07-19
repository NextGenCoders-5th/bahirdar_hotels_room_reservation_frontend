import { VscAccount } from "react-icons/vsc";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/authApi";
import toast from "react-hot-toast";

const links = [
  {
    title: "Profile",
    icon: <VscAccount size={"20px"} />,
    to: "/account/profile",
  },
  {
    title: "Dashboard",
    icon: <LuLayoutDashboard size="20px" />,
    to: "/dashboard",
  },
  {
    title: "Sign Out",
    icon: <IoIosLogOut size="20px" />,
    to: "/",
  },
];

function HeaderAccountMenu() {
  const { role, handleOpenModal } = useAuthContext();
  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <ul className="bg-slate-100 shadow-lg rounded-lg w-full md:w-56 p-2 space-y-1 border border-gray-200">
      {links.map((link) => {
        if (link.title === "Sign Out")
        {
          return (
            <li key={link.title} className="border-t border-gray-300 pt-2">
              <button
                disabled={isLoading}
                onClick={() => {
                  logout()
                    .unwrap()
                    .then(() => {
                      localStorage.removeItem("access-token");
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    })
                    .catch((err) => {
                      if ("data" in err)
                      {
                        toast.error(
                          err.data.message || "Something went wrong. Please try again"
                        );
                      } else
                      {
                        toast.error("An error occurred. Please try again");
                      }
                    });
                }}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-300 hover:bg-red-100 rounded-md disabled:cursor-not-allowed disabled:bg-gray-200"
              >
                {link.icon}
                {link.title}
              </button>
            </li>
          );
        }

        if (link.title === "Dashboard" && role !== "admin" && role !== "manager")
        {
          return null;
        }

        return (
          <li key={link.title}>
            <Link
              to={link.to}
              onClick={handleOpenModal}
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100"
            >
              {link.icon}
              {link.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default HeaderAccountMenu;
