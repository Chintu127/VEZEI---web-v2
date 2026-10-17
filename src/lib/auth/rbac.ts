import { UserRole } from "@/context/AppProvider";

export type Permission =
  | "platform.view"
  | "platform.configure"
  | "users.view"
  | "users.manage"
  | "roles.view"
  | "roles.assign"
  | "exams.view"
  | "exams.manage"
  | "content.view"
  | "content.edit"
  | "content.publish"
  | "analytics.view"
  | "audit.view"
  | "developer.tasks.view"
  | "developer.tasks.manage"
  | "diagnostics.view"
  | "qa.execute"
  | "security.review";

export interface RoleDefinition {
  id: UserRole;
  title: string;
  description: string;
  route: string;
  badgeColor: string;
  permissions: Permission[];
}

export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  super_admin: {
    id: "super_admin",
    title: "Super Admin",
    description: "Highest system authority: platform health, role delegations, audit logs, and global security controls.",
    route: "/admin/super",
    badgeColor: "#FF4FA3",
    permissions: [
      "platform.view",
      "platform.configure",
      "users.view",
      "users.manage",
      "roles.view",
      "roles.assign",
      "exams.view",
      "exams.manage",
      "content.view",
      "content.edit",
      "content.publish",
      "analytics.view",
      "audit.view",
      "developer.tasks.view",
      "developer.tasks.manage",
      "diagnostics.view",
      "qa.execute",
      "security.review",
    ],
  },
  main_admin: {
    id: "main_admin",
    title: "Main Admin",
    description: "Educational content director: exam catalog, syllabus architectures, question reviews, and mock tests.",
    route: "/admin/main",
    badgeColor: "#C8FF3D",
    permissions: [
      "platform.view",
      "users.view",
      "exams.view",
      "exams.manage",
      "content.view",
      "content.edit",
      "content.publish",
      "analytics.view",
      "audit.view",
    ],
  },
  developer_1: {
    id: "developer_1",
    title: "Tech Developer 1",
    description: "Frontend & UI/UX engineering: component library, design tokens, client performance, and layout diagnostics.",
    route: "/admin/developer-1",
    badgeColor: "#5B3DF5",
    permissions: [
      "developer.tasks.view",
      "developer.tasks.manage",
      "content.view",
      "diagnostics.view",
    ],
  },
  developer_2: {
    id: "developer_2",
    title: "Tech Developer 2",
    description: "Backend & Database architecture: API latency, Supabase schema migrations, cache layers, and scoring logic.",
    route: "/admin/developer-2",
    badgeColor: "#5B3DF5",
    permissions: [
      "developer.tasks.view",
      "developer.tasks.manage",
      "diagnostics.view",
      "exams.view",
    ],
  },
  developer_3: {
    id: "developer_3",
    title: "Tech Developer 3",
    description: "QA & Integration verification: automated test suite runner, defect registry, and regression monitoring.",
    route: "/admin/developer-3",
    badgeColor: "#C8FF3D",
    permissions: [
      "developer.tasks.view",
      "qa.execute",
      "diagnostics.view",
      "content.view",
    ],
  },
  student: {
    id: "student",
    title: "Student Aspirant",
    description: "Personalized competitive exam preparation, Socratic AI drills, mock tests, and active streaks.",
    route: "/app",
    badgeColor: "#C8FF3D",
    permissions: [],
  },
  admin: {
    id: "admin",
    title: "Admin",
    description: "Administrative console access.",
    route: "/admin/main",
    badgeColor: "#C8FF3D",
    permissions: [
      "platform.view",
      "users.view",
      "exams.view",
      "exams.manage",
      "content.view",
      "content.edit",
      "content.publish",
      "analytics.view",
      "audit.view",
    ],
  },
};

export function hasPermission(role: UserRole | undefined, permission: Permission): boolean {
  if (!role) return false;
  const def = ROLE_DEFINITIONS[role];
  if (!def) return false;
  return def.permissions.includes(permission);
}

export function canAccessRoute(role: UserRole | undefined, pathname: string): boolean {
  if (!role) return false;
  if (role === "super_admin") return true;

  if (pathname.startsWith("/admin/super")) {
    return false;
  }
  if (pathname.startsWith("/admin/main")) {
    return role === "main_admin" || role === "admin";
  }
  if (pathname.startsWith("/admin/developer-1")) {
    return role === "developer_1";
  }
  if (pathname.startsWith("/admin/developer-2")) {
    return role === "developer_2";
  }
  if (pathname.startsWith("/admin/developer-3")) {
    return role === "developer_3";
  }
  if (pathname.startsWith("/admin")) {
    return role !== "student";
  }
  return true;
}
