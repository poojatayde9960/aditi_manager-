import { Menu, LogOut } from "lucide-react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { managerLogout } from "../../Redux/slices/authSlices";

const Header = ({ toggleSidebar, theme, setTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { manager } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(managerLogout());
    navigate("/login");
  };

  // Get initials or first letter of name
  const getUserInitial = () => {
    if (manager?.name) return manager.name.charAt(0).toUpperCase();
    if (manager?.manager?.name) return manager.manager.name.charAt(0).toUpperCase();
    return "A";
  };

  return (
    <header className="fixed top-0 right-0 z-50 
      bg-white/5 backdrop-blur-xl border-b border-white/10 px-4 py-3
      w-full md:w-[calc(100%-92px)] md:ml-23"
    >
      <div className="w-full flex items-center justify-between">

        {/* Left Side: Toggle + Search */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={toggleSidebar}
          >
            <Menu size={26} />
          </button>

          {/* Search Bar */}
          <div className="relative w-full sm:w-[250px] md:w-[350px] lg:w-[400px]">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full bg-[#020523] backdrop-blur-md 
                text-white placeholder-gray-400
                pl-12 pr-6 py-3 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-cyan-400/50 
                focus:border-cyan-400/50 focus:bg-white/5
                transition-all duration-300 text-sm sm:text-base"
            />
            <Icon
              icon="mynaui:search"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            />
          </div>
        </div>

        {/* Right Side: Icons + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 rounded-full
              bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500
              border border-white/10 hover:border-red-500/50
              transition-all duration-300 group relative"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="absolute -bottom-10 right-0 scale-0 group-hover:scale-100 
              bg-red-500 text-white text-[10px] px-2 py-1 rounded-md
              transition-all duration-200 pointer-events-none whitespace-nowrap">
              Logout
            </span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full 
            bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-semibold text-sm
            shadow-lg shadow-cyan-500/30 border border-white/20">
            {getUserInitial()}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
