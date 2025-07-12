import { BookOpen, GraduationCap, Trophy, User } from "lucide-react";

export const StudentMenu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: User,
  },
  {
    name: "Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    name: "Exams",
    href: "/student/exams",
    icon: GraduationCap,
  },
  {
    name: "Achievements",
    href: "/student/achievements",
    icon: Trophy,
  },
];
