// Enhanced Header Component
import {ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  onLogout?: () => void;
}

const EnhancedHeader: React.FC<HeaderProps> = ({
  userInfo,
  onLogout,
}) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout logic
      console.log("Logout clicked");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl mb-8 overflow-hidden">
      <div className="px-8 py-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        
        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-between">
          {/* Left Side - Title Section */}
          <div className="flex items-center gap-6">
            <div>
              <h1 className="!text-4xl font-bold !text-white mb-2">
                Manajemen Produk
              </h1>
            </div>
          </div>

          {/* Right Side - Profile & Actions */}
          <div className="flex items-center gap-4">

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 text-white hover:bg-white/20 rounded-xl !px-4 !py-2 h-auto border border-white/20 backdrop-blur-sm"
                >
                  <Avatar className="h-10 w-10 border-2 border-white/30">
                    <AvatarImage src={userInfo?.avatar} alt={userInfo?.name} />
                    <AvatarFallback className="bg-white/20 text-white font-semibold">
                      {getInitials(userInfo?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <p className="font-semibold text-sm">{userInfo?.name}</p>
                    <p className="text-xs text-blue-200">{userInfo?.role}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-blue-200" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                className="w-64 bg-white/95 backdrop-blur-md border border-blue-100 shadow-xl rounded-xl"
                align="end"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold text-gray-800">
                      {userInfo?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userInfo?.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {userInfo?.role}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Online
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator className="bg-blue-100" />
                

                
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg mx-2 cursor-pointer text-red-600"
                >
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>

      </div>
    </div>
  );
};

export default EnhancedHeader;