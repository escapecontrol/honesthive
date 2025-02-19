import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";
import { TeamMembersList } from "@/components/teams/TeamMembersList";
import { RecentKudos } from "@/components/kudos/RecentKudos";
import { useAuth } from "@/hooks/use-auth";
import { getTeamFeedback } from "@/services/feedbackApi";
import { useToast } from "@/hooks/use-toast";
import { Member } from "@/types/api/member";
import { TeamFeedback } from "@/types/api/teamFeedback";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/UserAtom";
import { EmptyState } from "@/components/ui/empty-state";
import { UserPlus } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { toast } = useToast();
  const [teamFeedback, setTeamFeedback] = useState<TeamFeedback[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appUser] = useAtom(userAtom);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!appUser.team.id) {
        navigate("/create-team");
        return null;
      }
      
      try {
        const response = await getTeamFeedback(token, appUser.team.id);
        setTeamFeedback(response.data.feedback);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching feedback.",
          variant: "destructive",
        });
      }
    };

    fetchFeedback();
  }, [token, toast, appUser.team.id, navigate]);

  const handleViewKudos = (name: string, email: string) => {
    navigate("/view-kudos", { state: { userName: name, userEmail: email } });
  };

  const handleMemberSelect = (member: Member) => {
    if (member.isPending) {
      toast({
        title: "Oops!",
        description: "Providing feedback to an invited member is not supported.",
        variant: "destructive",
      });
      return;
    }
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center animate-fade-down">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Our Feedback
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Celebrate your colleagues by sharing meaningful feedback and recognition.
          </p>
        </div>

        {appUser.team.members.length > 0 ? (
          <TeamMembersList
            members={appUser.team.members}
            onMemberSelect={handleMemberSelect}
          />
        ) : (
          <EmptyState
            icon={UserPlus}
            title="No team members yet"
            description="To add new members, go to the Manage Team page."
          />
        )}

        <RecentKudos kudos={teamFeedback} onViewKudos={handleViewKudos} />
      </div>

      {selectedMember && (
        <FeedbackDialog
          member={selectedMember}
          token={token}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </div>
  );
};

export default Index;
