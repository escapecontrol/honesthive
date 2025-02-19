import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TeamTypeSelector } from "@/components/teams/TeamTypeSelector";
import { GrowthCategories } from "@/components/teams/GrowthCategories";
import { TeamNameForm } from "@/components/teams/TeamNameForm";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { createTeam } from "@/services/peerApi";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/UserAtom";

type TeamType = "family" | "organisation";

const steps = [
  { id: 1, title: "Choose Team Type" },
  { id: 2, title: "Growth Categories" },
  { id: 3, title: "Team Details" },
];

export default function CreateTeam() {
  const [currentStep, setCurrentStep] = useState(1);
  const [teamType, setTeamType] = useState<TeamType | null>(null);
  const [teamName, setTeamName] = useState("");
  const [token, setToken] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [, setAppUser] = useAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: FirebaseUser | null) => {
        if (user) {
          const idToken = await user.getIdToken();
          setToken(idToken);
        } else {
          navigate("/login"); // Redirect to login if not authenticated
        }
      }
    );

    return () => unsubscribe();
  }, [navigate]);

  const handleNext = () => {
    if (currentStep === 1 && !teamType) {
      toast({
        title: "One moment before we continue 🤔",
        description: "You are forgetting to select a type of team?",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = async () => {
    if (!teamName.trim()) {
      toast({
        title: "One more thing before we continue 🤔",
        description: "You have forgotten to enter a team name.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, statusCode } = await createTeam(token, teamName, teamType);
      
      if (statusCode === 200 && data) {
        setAppUser(prev => ({
          ...prev,
          team: {
            id: data.team.id,
            name: data.team.name,
            members: [],
          }
        }));

        toast({
          title: "Team Created 🎉",
          description: `${teamName} has been created successfully.`,
        });
        navigate("/manage-team");
      } else {
        throw new Error("Failed to create team");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create a new team.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-4xl py-8 animate-fade-up">
      <h1 className="text-3xl font-bold mb-8">Create New Team</h1>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center ${
              step.id === currentStep
                ? "text-primary"
                : step.id < currentStep
                ? "text-muted-foreground"
                : "text-muted"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                step.id === currentStep
                  ? "bg-primary text-white"
                  : step.id < currentStep
                  ? "bg-muted-foreground text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.id}
            </div>
            <span>{step.title}</span>
          </div>
        ))}
      </div>

      <Card className="p-6">
        {currentStep === 1 && (
          <TeamTypeSelector
            selectedType={teamType}
            onSelect={(type) => setTeamType(type as TeamType)}
          />
        )}

        {currentStep === 2 && teamType && (
          <GrowthCategories teamType={teamType} />
        )}

        {currentStep === 3 && (
          <TeamNameForm teamName={teamName} onChange={setTeamName} />
        )}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>

          {currentStep < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleCreate}>Create Team</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
