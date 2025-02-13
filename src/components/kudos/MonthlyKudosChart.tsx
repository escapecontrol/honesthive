import { Card } from "@/components/ui/card";
import { RadialBarChart, RadialBar, Legend } from "recharts";
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

interface MonthlyKudosChartProps {
  data: KudosData;
}

export const MonthlyKudosChart = ({ data }: MonthlyKudosChartProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">{data.name}</h3>
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
              { name: 'Teamwork', value: data.teamwork * 20, fill: '#6366F1' },
              { name: 'Innovation', value: data.innovation * 20, fill: '#EC4899' },
              { name: 'Excellence', value: data.excellence * 20, fill: '#10B981' },
              { name: 'Leadership', value: data.leadership * 20, fill: '#F59E0B' },
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
};