import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getMyProfile, getMyTeam } from "@/services/peerApi";
import { useAtom } from "jotai";
import { Member, userAtom } from "@/atoms/UserAtom";
import Logo from "@/components/logos/Logo";
import DarkerLogo from "@/components/logos/DarkerLogo";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [, setUser] = useAtom(userAtom);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const [profileResponse, teamResponse] = await Promise.all([
        getMyProfile(token),
        getMyTeam(token)
      ]);

      const hasCompletedProfile = Object.keys(profileResponse.data).length > 0;
      const team = teamResponse.data.teams?.[0] || { id: "", name: "", members: [], pendingMembers: [] };

      // Process active and pending members
      const activeMembers = (team.members || []).map((member: Member) => ({
        ...member,
        isPending: false
      }));

      const pendingMembers = (team.pendingMembers || []).map((member: Member) => ({
        ...member,
        isPending: true
      }));

      if (profileResponse.statusCode === 200) {
        setUser({
          firstName: profileResponse.data?.firstName || "",
          lastName: profileResponse.data?.lastName || "",
          profileUrl: profileResponse.data?.profileUrl || "",
          hasCompletedProfile: hasCompletedProfile,
          team: {
            id: team.id,
            name: team.name,
            members: [...activeMembers, ...pendingMembers],
          },
        });
      }

      toast({
        title: "Google Login",
        description: "You have successfully logged in with Google.",
      });

      if (hasCompletedProfile) {
        const from = location.state?.from || "/";
        navigate(from, { replace: true });
      } else {
        // Check if we came from a team invitation
        const invitePath = location.state?.from;
        const inviteSlug = invitePath?.match(/\/team-invitation\/(.+)/)?.[1];
        
        navigate("/profile", { 
          state: { inviteSlug }
        });
      }
    } catch (error) {
      toast({
        title: "Google Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo width={28} height={33} />
          &nbsp; HonestHive
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This platform has revolutionized how we handle feedback and
              recognition in our team. It's simple, effective, and keeps
              everyone motivated."
            </p>
            <footer className="text-sm">John Anderson</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex justify-center">
            <DarkerLogo />
          </div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome,</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account below.
            </p>
          </div>
          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleLogin}
            className="w-full"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Don't have an account? Just login with Google and we'll create an
            account for you.
            {/* <Link to="/signup" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link> */}
          </p>
        </div>
      </div>
    </div>
  );
}
