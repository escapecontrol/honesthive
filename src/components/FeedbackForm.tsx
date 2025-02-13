import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { analyzeFeedback } from "@/lib/feedbackAnalysis";
import { UserRound } from "lucide-react";

// Sample team members data - in a real app this would come from an API
const TEAM_MEMBERS = [
  { id: "1", name: "Alex Thompson", email: "alex.thompson@example.com" },
  { id: "2", name: "Sarah Chen", email: "sarah.chen@example.com" },
  { id: "3", name: "Michael Rodriguez", email: "michael.r@example.com" },
];

export const FeedbackForm = () => {
  const [message, setMessage] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) {
      toast({
        title: "Please select a team member",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    try {
      const categoryRatings = await analyzeFeedback(message);
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! AI analysis complete.",
      });
      
      setMessage("");
      setSelectedMember("");
    } catch (error) {
      toast({
        title: "Error analyzing feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 animate-fade-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Team Member</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {TEAM_MEMBERS.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedMember(member.id)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedMember === member.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-muted p-2 rounded-full">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.email}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts..."
            className="min-h-[100px]"
          />
        </div>
        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </form>
    </Card>
  );
};