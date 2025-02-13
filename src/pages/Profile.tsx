import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { getMyProfile, saveMyProfile } from "@/services/peerApi";
import { useAuth } from '@/hooks/use-auth';

export default function Profile() {
  const { user, token } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [outOfSync, setOutOfSync] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const { data } = await getMyProfile(token);

          if (
            data.firstName === "" ||
            data.lastName === "" ||
            data.email === "" ||
            data.profileUrl === ""
          ) {
            setOutOfSync(true);

            // Use details from the auth provider
            setFirstName(user.displayName?.split(" ")[0] || "");
            setLastName(user.displayName?.split(" ")[1] || "");
            setEmail(user.email || "");
            setProfileUrl(user.photoURL || "");
            return;
          }

          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setProfileUrl(data.profileUrl);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load profile.",
            variant: "destructive",
          });
        }
      };

      fetchProfile();
    }
  }, [user, token, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveMyProfile(token, { firstName, lastName, email, profileUrl });
      toast({
        title: "Profile Updated",
        description: "Nice one! We have updated your profile.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-2xl py-10 space-y-8 animate-fade-up">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      {outOfSync && (
        <div className="bg-primary-50 p-4 rounded-md">
          <p className="text-warning-900">
            Your profile is not synced. Please check below and save.
          </p>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                readOnly
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileUrl">Profile URL</Label>
              <Input
                id="profileUrl"
                value={profileUrl}
                readOnly
                className="bg-muted"
              />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}