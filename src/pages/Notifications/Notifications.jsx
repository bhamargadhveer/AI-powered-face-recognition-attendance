import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { useNotifications } from "../../context/NotificationContext.jsx";

export default function Notifications() {
  const { items, unread, markAllRead, markRead } = useNotifications();
  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={`You have ${unread} unread notifications`}
        actions={<Button variant="outline" onClick={markAllRead}>Mark all as read</Button>}
      />
      <Card className="divide-y divide-border">
        {items.map((n) => (
          <div
            key={n.id}
            onClick={() => markRead(n.id)}
            className={`flex gap-4 p-5 cursor-pointer hover:bg-muted/40 ${!n.read ? "bg-primary/5" : ""}`}
          >
            <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
              n.type === "warning" ? "bg-[var(--warning)]" :
              n.type === "success" ? "bg-[var(--success)]" : "bg-primary"
            }`}/>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-medium">{n.title}</div>
                {!n.read && <Badge tone="primary">New</Badge>}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{n.body}</div>
              <div className="text-xs text-muted-foreground mt-2">{n.time}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}