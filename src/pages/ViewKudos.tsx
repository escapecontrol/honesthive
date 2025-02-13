import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, ThumbsUp, Trophy } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";

interface KudosData {
  name: string;
  teamwork: number;
  innovation: number;
  excellence: number;
  leadership: number;
  fill: string;
}

const LAST_4_MONTHS_DATA: KudosData[] = [
  { name: "Jun 2024", teamwork: 8, innovation: 6, excellence: 5, leadership: 3, fill: "#F59E0B" },
  { name: "May 2024", teamwork: 5, innovation: 3, excellence: 2, leadership: 4, fill: "#10B981" },
  { name: "Apr 2024", teamwork: 2, innovation: 5, excellence: 4, leadership: 1, fill: "#EC4899" },
  { name: "Mar 2024", teamwork: 7, innovation: 4, excellence: 3, leadership: 3, fill: "#6366F1" },
].sort((a, b) => new Date(b.name).getTime() - new Date(a.name).getTime());

const ViewKudos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { userName, userEmail } = location.state || {};

  const kudosStats = [
    {
      icon: Star,
      label: "Total Kudos",
      value: "29",
      description: "All time kudos received",
    },
    {
      icon: Trophy,
      label: "Top Category",
      value: "Teamwork",
      description: "Most frequent kudos type",
    },
    {
      icon: ThumbsUp,
      label: "Recent Kudos",
      value: "8",
      description: "Received this month",
    },
  ];

  const renderRadialChart = (month: KudosData) => (
    <Card key={month.name} className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">{month.name}</h3>
      <div className={isMobile ? "h-[200px]" : "h-[250px]"}>
        <ChartContainer
          className="h-full"
          config={{
            teamwork: {
              theme: {
                light: "#6366F1",
                dark: "#6366F1",
              },
            },
            innovation: {
              theme: {
                light: "#EC4899",
                dark: "#EC4899",
              },
            },
            excellence: {
              theme: {
                light: "#10B981",
                dark: "#10B981",
              },
            },
            leadership: {
              theme: {
                light: "#F59E0B",
                dark: "#F59E0B",
              },
            },
          }}
        >
          <RadialBarChart
            data={[
              { name: 'Teamwork', value: month.teamwork * 20, fill: '#6366F1' },
              { name: 'Innovation', value: month.innovation * 20, fill: '#EC4899' },
              { name: 'Excellence', value: month.excellence * 20, fill: '#10B981' },
              { name: 'Leadership', value: month.leadership * 20, fill: '#F59E0B' },
            ]}
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="80%"
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              label={false}
              background
              dataKey="value"
              cornerRadius={isMobile ? 15 : 20}
            />
            <Legend
              iconSize={isMobile ? 8 : 10}
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={isMobile ? { fontSize: '10px' } : undefined}
            />
            <ChartTooltip />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </Card>
  );

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
            <h1 className="text-2xl md:text-3xl font-bold">{userName}'s Kudos Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">{userEmail}</p>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          {kudosStats.map((stat, index) => (
            <Card key={index} className="p-4 md:p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 md:p-3 bg-primary/10 rounded-full">
                  <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  <h3 className="text-xl md:text-2xl font-bold">{stat.value}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {LAST_4_MONTHS_DATA.map(renderRadialChart)}
        </div>
      </div>
    </div>
  );
};

export default ViewKudos;