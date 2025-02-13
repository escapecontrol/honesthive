import { Member } from "@/types/api/member";

// Simulating API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTeamMembers = async (): Promise<Member[]> => {
  // Simulate API delay
  await delay(1500);
  
  return [
    {
      id: "1",
      profileUrl: "https://i.pravatar.cc/150?img=1",
      name: "Alex Thompson",
      email: "alex.thompson@example.com",
      isPending: false,
      lastActive: "2 hours ago"
    },
    {
      id: "2",
      profileUrl: "https://i.pravatar.cc/150?img=2",
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      isPending: false,
      lastActive: "5 mins ago"
    },
    {
      id: "3",
      profileUrl: "https://i.pravatar.cc/150?img=3",
      name: "Michael Rodriguez",
      email: "michael.r@example.com",
      isPending: false,
      lastActive: "1 day ago"
    },
  ];
};