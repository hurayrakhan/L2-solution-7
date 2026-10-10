"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HeadingText } from "@/components/ui/typography/HeadingText";
import { ParagraphText } from "@/components/ui/typography/ParagraphText";

export interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  hasBackButton?: boolean;
  backButtonUrl?: string;
  onBackClick?: () => void;
  action?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  as = "h1",
  className,
  titleClassName,
  subtitleClassName,
  hasBackButton = false,
  backButtonUrl,
  onBackClick,
  action,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2",
        className
      )}
    >
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
        {hasBackButton && (
          <Button
            variant="outline"
            size="icon-sm"
            href={backButtonUrl}
            onClick={!backButtonUrl ? handleBack : undefined}
            type={!backButtonUrl ? "button" : undefined}
            aria-label="Go back"
            className="shrink-0 rounded-lg"
          >
            <ArrowLeft className="size-4" />
          </Button>
        )}
        <div className="flex flex-col gap-1 min-w-0">
          <HeadingText
            as={as}
            size="4"
            weight="bold"
            tracking="tight"
            className={titleClassName}
          >
            {title}
          </HeadingText>
          {subtitle && (
            <ParagraphText
              size="2"
              color="muted"
              className={cn("max-w-2xl", subtitleClassName)}
            >
              {subtitle}
            </ParagraphText>
          )}
        </div>
      </div>
      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>
  );
}
