import { ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, forwardRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface LinkCardProps {
  title: string;
  url: string;
  variant?: "gradient" | "outline" | "glass";
  type?: "pix" | "payment" | "custom-payment";
  pixCode?: string;
  onCustomPayment?: () => void;
}

export const LinkCard = forwardRef<HTMLButtonElement, LinkCardProps>(({ 
  title, 
  url, 
  variant = "outline", 
  type = "payment",
  pixCode,
  onCustomPayment
}, ref) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    if (type === "pix" && pixCode) {
      try {
        await navigator.clipboard.writeText(pixCode);
        setCopied(true);
        toast({
          title: "PIX copiado!",
          description: "O código PIX foi copiado para a área de transferência.",
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast({
          title: "Erro ao copiar",
          description: "Não foi possível copiar o código PIX.",
          variant: "destructive",
        });
      }
    } else if (type === "custom-payment" && onCustomPayment) {
      onCustomPayment();
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const getIcon = () => {
    if (type === "pix") {
      return copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />;
    }
    return <ExternalLink className="w-4 h-4" />;
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      className="w-full h-14 sm:h-16 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm bg-white/20 border-2 border-white/30 text-white hover:bg-white/30 rounded-xl sm:rounded-2xl group"
      onClick={handleClick}
    >
      <span className="flex-1 group-hover:text-pink-100 transition-colors px-2">{title}</span>
      <div className="transition-transform group-hover:scale-110">
        {getIcon()}
      </div>
    </Button>
  );
});
