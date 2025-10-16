import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkCardProps {
  title: string;
  url: string;
  variant?: "gradient" | "outline" | "glass";
}

export const LinkCard = ({ title, url, variant = "outline" }: LinkCardProps) => {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      variant={variant}
      className="w-full h-14 text-base font-medium transition-smooth hover:scale-105"
      onClick={handleClick}
    >
      <span className="flex-1">{title}</span>
      <ExternalLink className="w-4 h-4" />
    </Button>
  );
};
