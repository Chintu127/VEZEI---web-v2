import { NextResponse } from "next/server";

export async function GET() {
  const notifications = [
    {
      id: "notif-1",
      title: "🔥 5-Day Study Streak Maintained!",
      message: "You solved 10 practice questions yesterday. Your streak defense shield is active.",
      type: "streak",
      isRead: false,
      createdAt: "2 hours ago",
    },
    {
      id: "notif-2",
      title: "💎 Promoted to Diamond League!",
      message: "Your weekly score of 2,450 XP placed you in the top 5% of global aspirants.",
      type: "reward",
      isRead: true,
      createdAt: "Yesterday",
    },
    {
      id: "notif-3",
      title: "📝 CAT Proctored Mock #02 Ready",
      message: "The new all-India proctored mock simulation is now available in your test library.",
      type: "test",
      isRead: true,
      createdAt: "2 days ago",
    },
  ];

  return NextResponse.json({
    success: true,
    notifications,
    unreadCount: notifications.filter((n) => !n.isRead).length,
  });
}
