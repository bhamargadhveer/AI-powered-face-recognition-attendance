import { Download, FileDown, Filter } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { attendanceMonthly, attendanceWeekly } from "../../data/attendance.js";
import { classes } from "../../data/classes.js";

export default function Reports() {
  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Generate, view, and export attendance reports."
        actions={<>
          <Button variant="outline"><Filter size={16}/> Date range</Button>
          <Button variant="outline"><FileDown size={16}/> PDF</Button>
          <Button><Download size={16}/> CSV</Button>
        </>}
      />
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {[
          { t: "This month", v: "94.2%", d: "+2.1% vs last month" },
          { t: "Best class", v: "10-A", d: "97.8% attendance" },
          { t: "At risk", v: "12", d: "Students below 75%" },
        ].map((s) => (
          <Card key={s.t} className="p-5">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.t}</div>
            <div className="mt-2 text-3xl font-bold">{s.v}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.d}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Monthly attendance rate</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={attendanceMonthly}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12}/>
                <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[80,100]}/>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}/>
                <Area type="monotone" dataKey="rate" stroke="var(--primary)" strokeWidth={2.5} fill="url(#g1)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Weekly breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={attendanceWeekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12}/>
                <YAxis stroke="var(--muted-foreground)" fontSize={12}/>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}/>
                <Bar dataKey="present" stackId="a" fill="#10B981" radius={[0,0,0,0]}/>
                <Bar dataKey="late" stackId="a" fill="#F59E0B"/>
                <Bar dataKey="absent" stackId="a" fill="#EF4444" radius={[8,8,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h3 className="font-semibold mb-4">Class-wise report</h3>
        <div className="grid gap-3">
          {classes.map((c) => {
            const rate = 82 + ((c.students * 3) % 15);
            return (
              <div key={c.id} className="flex items-center gap-4 rounded-xl border border-border p-4">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${c.color} text-white text-xs font-bold`}>
                  {c.name.split(" ")[1]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{c.name} • {c.subject}</div>
                  <div className="text-xs text-muted-foreground">{c.teacher}</div>
                </div>
                <div className="w-48 hidden md:block">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${rate >= 90 ? "bg-[var(--success)]" : rate >= 80 ? "bg-[var(--warning)]" : "bg-[var(--danger)]"}`} style={{ width: `${rate}%` }} />
                  </div>
                </div>
                <Badge tone={rate >= 90 ? "success" : rate >= 80 ? "warning" : "danger"}>{rate}%</Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}