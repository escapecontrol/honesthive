import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { getInvitation, acceptInvitation } from "@/services/inviteApi";
import { useAuth } from "@/hooks/use-auth";

export default function TeamInvitation() {
  const { user, token } = useAuth();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [invitationData, setInvitationData] = useState(null);

  const invitationSlug = slug || "-";
  
  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const response = await getInvitation(token, invitationSlug);
        if (response.statusCode === 200) {
          setInvitationData(response.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to load invitation data.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    };

    if (invitationSlug && token) {
      fetchInvitation();
    }
  }, [invitationSlug, token, navigate, toast]);

  const handleResponse = async (accept: boolean) => {
    if (accept && !acceptedTerms) {
      toast({
        title: "Terms and Conditions Required",
        description: "Please accept the terms and conditions to join the team.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      if (accept) {
        const acceptResponse = await acceptInvitation(token, invitationSlug);
        if (acceptResponse.statusCode === 200) {
          toast({
            title: "Invitation Accepted",
            description: "You have joined the team.",
          });
          navigate("/");
        } else {
          toast({
            title: "Error",
            description: "Failed to accept invitation data.",
            variant: "destructive",
          });
        }
      } else {
        // Handle decline invitation logic here if needed
        toast({
          title: "Invitation Declined",
          description: "You have declined the invitation.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container max-w-2xl py-10 space-y-8 animate-fade-up">
      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Team Invitation</h1>
          <p className="mb-4">
            You have been invited to join&nbsp;
            <strong>{invitationData && invitationData.team}</strong> by&nbsp;
            <strong>{invitationData && invitationData.friend}</strong>.
          </p>
          <div className="mb-4">
            <Switch
              id="accept-terms"
              checked={acceptedTerms}
              onCheckedChange={setAcceptedTerms}
            />
            <label htmlFor="accept-terms" className="ml-2">
              I accept the terms and conditions
            </label>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={() => handleResponse(true)}
              disabled={isProcessing}
              className="flex items-center"
            >
              <Check className="mr-2 h-5 w-5" />
              Accept
            </Button>
            <Button
              onClick={() => handleResponse(false)}
              variant="outline"
              disabled={isProcessing}
              className="flex items-center"
            >
              <X className="mr-2 h-5 w-5" />
              Decline
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}