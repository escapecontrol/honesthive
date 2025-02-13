import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { KudosStats } from "@/components/kudos/KudosStats";
import { MonthlyKudosChart } from "@/components/kudos/MonthlyKudosChart";
import { RecentFeedback } from "@/components/kudos/RecentFeedback";

const LAST_4_MONTHS_DATA = [
  { name: "Jun 2024", teamwork: 5, innovation: 3, excellence: 4, leadership: 2, fill: "#F59E0B" },
  { name: "May 2024", teamwork: 3, innovation: 2, excellence: 1, leadership: 2, fill: "#10B981" },
  { name: "Apr 2024", teamwork: 1, innovation: 4, excellence: 3, leadership: 0, fill: "#EC4899" },
  { name: "Mar 2024", teamwork: 4, innovation: 3, excellence: 2, leadership: 2, fill: "#6366F1" },
].sort((a, b) => new Date(b.name).getTime() - new Date(a.name).getTime());

const RECENT_FEEDBACK = [
  {
    avatar: "/placeholder.svg",
    name: "Sarah Johnson",
    message: "Great teamwork on the Q2 project! Your leadership really showed.",
    date: new Date("2024-03-15"),
  },
  {
    avatar: "/placeholder.svg",
    name: "Mike Chen",
    message: "Excellent presentation skills during the client meeting.",
    date: new Date("2024-03-10"),
  },
  {
    avatar: "/placeholder.svg",
    name: "Emily Davis",
    message: "Your innovative approach to problem-solving is inspiring.",
    date: new Date("2024-03-05"),
  },
  {
    avatar: "/placeholder.svg",
    name: "Alex Thompson",
    message: "Thanks for helping the new team members get up to speed.",
    date: new Date("2024-02-28"),
  },
  {
    avatar: "/placeholder.svg",
    name: "Rachel Kim",
    message: "Outstanding contribution to the product launch!",
    date: new Date("2024-02-25"),
  },
  {
    avatar: "/placeholder.svg",
    name: "David Martinez",
    message: "Your attention to detail really made a difference.",
    date: new Date("2024-02-20"),
  },
  {
    avatar: "/placeholder.svg",
    name: "Lisa Wong",
    message: "Great collaboration on the cross-functional initiative.",
    date: new Date("2024-02-15"),
  },
  {
    avatar: "/placeholder.svg",
    name: "James Wilson",
    message: "Excellent mentorship to junior team members.",
    date: new Date("2024-02-10"),
  },
];

const MyKudos = () => {
  const navigate = useNavigate();
  const feedbackSectionRef = useRef<HTMLDivElement>(null);

  const scrollToFeedback = () => {
    feedbackSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">My Kudos Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">Track your personal kudos and growth</p>
          </div>
        </div>

        <KudosStats onRecentKudosClick={scrollToFeedback} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {LAST_4_MONTHS_DATA.map((monthData) => (
            <MonthlyKudosChart key={monthData.name} data={monthData} />
          ))}
        </div>

        <RecentFeedback 
          feedback={RECENT_FEEDBACK}
          reference={feedbackSectionRef}
        />
      </div>
    </div>
  );
};

export default MyKudos;
