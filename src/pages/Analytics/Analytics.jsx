import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { attendanceMonthly, heatmap } from "../../data/attendance.js";

const radar = [
  { subject: "Math", A: 92, B: 87 },
  { subject: "Physics", A: 88, B: 82 },
  { subject: "English", A: 95, B: 91 },
  { subject: "Biology", A: 84, B: 79 },
  { subject: "CS", A: 96, B: 89 },
  { subject: "History", A: 89, B: 84 },
];

const compare = attendanceMonthly.map((m, i) => ({ m: m.m, thisYear: m.rate, lastYear: m.rate - 3 - (i % 3) }));

export default function Analytics() {
  return (
    <div>
      <PageHeader title="Analytics" subtitle="Trends, heatmaps, and performance insights." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Year-over-year comparison</h3>
            <Badge tone="success">+4.1%</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={compare}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12}/>
                <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[75,100]}/>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}/>
                <Line dataKey="thisYear" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }}/>
                <Line dataKey="lastYear" stroke="var(--muted-foreground)" strokeDasharray="4 4" strokeWidth={2} dot={{ r: 3 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Performance by subject</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={radar}>
                <PolarGrid stroke="var(--border)"/>
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}/>
                <PolarRadiusAxis angle={90} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}/>
                <Radar name="This term" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3}/>
                <Radar name="Last term" dataKey="B" stroke="#10B981" fill="#10B981" fillOpacity={0.15}/>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Attendance heatmap</h3>
          <span className="text-xs text-muted-foreground">Hour × Day</span>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day, r) => (
              <div key={day} className="flex items-center gap-1 mb-1">
                <div className="w-10 text-xs text-muted-foreground">{day}</div>
                <div className="flex gap-1 flex-1">
                  {heatmap[r].map((cell, c) => {
                    const alpha = cell.v / 100;
                    return (
                      <div
                        key={c}
                        title={`${cell.v}%`}
                        className="h-6 flex-1 rounded"
                        style={{ background: `color-mix(in oklab, var(--primary) ${Math.round(alpha * 90) + 10}%, var(--muted))` }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground pl-11">
              <span>0h</span><span className="flex-1"/><span>12h</span><span className="flex-1"/><span>23h</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}