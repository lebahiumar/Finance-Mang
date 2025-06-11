"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  variant?: "default" | "positive" | "negative";
  description?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  variant = "default",
  description,
}: DashboardCardProps) {
  const valueColorClass =
    variant === "positive"
      ? "text-accent"
      : variant === "negative"
      ? "text-destructive"
      : "text-primary";

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-headline text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className={cn("text-xl font-bold", valueColorClass)}>
          {typeof value === 'number' ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
