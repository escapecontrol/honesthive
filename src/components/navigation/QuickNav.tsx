import { Home, UsersRound, TrendingUpDown, UserRound, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function QuickNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
      <Button
        variant="secondary"
        size="icon"
        onClick={() => navigate('/')}
        className={`rounded-full shadow-md ${isActive('/') ? 'bg-primary text-primary-foreground' : ''}`}
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
      
      <Button
        variant="secondary"
        size="icon"
        onClick={() => navigate('/manage-team')}
        className={`rounded-full shadow-md ${isActive('/manage-team') ? 'bg-primary text-primary-foreground' : ''}`}
      >
        <UsersRound className="h-4 w-4" />
      </Button>
      
      <Button
        variant="secondary"
        size="icon"
        onClick={() => navigate('/my-kudos')}
        className={`rounded-full shadow-md ${isActive('/my-kudos') ? 'bg-primary text-primary-foreground' : ''}`}
      >
        <TrendingUpDown className="h-4 w-4" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        onClick={() => navigate('/profile')}
        className={`rounded-full shadow-md relative ${isActive('/profile') ? 'bg-primary text-primary-foreground' : ''}`}
      >
        <UserRound className="h-4 w-4" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#ea384c] rounded-full animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
      </Button>
    </div>
  );
}