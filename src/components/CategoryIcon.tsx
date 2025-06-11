"use client";

import type { ExpenseCategory } from "@/lib/types";
import {
  Utensils,
  Home,
  Car,
  Lightbulb,
  HeartPulse,
  Film,
  ShoppingBag,
  BookOpen,
  Plane,
  Sparkles,
  Gift,
  MoreHorizontal,
  LucideProps,
} from "lucide-react";

interface CategoryIconProps extends LucideProps {
  category: ExpenseCategory;
}

const iconMap: Record<ExpenseCategory, React.ElementType<LucideProps>> = {
  "Food & Dining": Utensils,
  Housing: Home,
  Transportation: Car,
  Utilities: Lightbulb,
  "Health & Wellness": HeartPulse,
  Entertainment: Film,
  Shopping: ShoppingBag,
  Education: BookOpen,
  Travel: Plane,
  "Personal Care": Sparkles,
  "Gifts & Donations": Gift,
  Other: MoreHorizontal,
};

export default function CategoryIcon({ category, ...props }: CategoryIconProps) {
  const IconComponent = iconMap[category] || MoreHorizontal;
  return <IconComponent {...props} />;
}
