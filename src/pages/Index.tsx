import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";
import { TeamMembersList } from "@/components/teams/TeamMembersList";
import { RecentKudos } from "@/components/kudos/RecentKudos";
import { useAuth } from "@/hooks/use-auth";
import { getMyTeam } from "@/services/peerApi";
import { getTeamFeedback } from "@/services/feedbackApi";
import { useToast } from "@/hooks/use-toast";
import { Member } from "@/types/api/member";
import { TeamFeedback } from "@/types/api/teamFeedback";

const Index = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [teamFeedback, setTeamFeedback] = useState<TeamFeedback[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getMyTeam(token);
        if (response.statusCode === 404) {
          navigate("/create-team");
          return;
        }

        const teamMembers = response.data.teams[0].members.map((member: Member) => ({
          id: member.id,
          name: member.name,
          email: member.email,
          profileUrl: member.profileUrl,
          isPending: false,
        }));

        const pendingMembers = response.data.teams[0].pendingMembers.map((member: Member) => ({
          id: member.id,
          name: member.name,
          email: member.email,
          profileUrl: member.profileUrl,
          isPending: true,
        }));

        setMembers([...teamMembers, ...pendingMembers]);
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    };

    const fetchFeedback = async (teamId: string) => {
      try {
        const response = await getTeamFeedback(token, teamId);
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

    if (user) {
      fetchTeam();

      // TODO: Fix teamId
      fetchFeedback('679d3792783af6def0268354');
    }
  }, [user, token, navigate, toast]);

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

        <TeamMembersList 
          members={members}
          onMemberSelect={handleMemberSelect}
        />

        <RecentKudos 
          kudos={teamFeedback}
          onViewKudos={handleViewKudos}
        />
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
