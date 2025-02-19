import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { giveFeedback } from "@/services/feedbackApi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Member } from "@/types/api/member";

interface FeedbackDialogProps {
  member: Member;
  token: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FeedbackDialog = ({ member, token, isOpen, onOpenChange }: FeedbackDialogProps) => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: "🫢 Excuse me?",
        description: "You can't submit an empty feedback message!",
        variant: "destructive",
      });
      return;
    }

    try {
      await giveFeedback(token, member.id, message);
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
      
      setMessage("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error submitting feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={member.profileUrl} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{member.name}</div>
              <div className="text-sm text-muted-foreground">{member.email}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your feedback..."
            className="min-h-[150px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};