import { Palette, Type, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CustomizationPanelProps {
  backgroundType: string;
  backgroundColor: string;
  linkVariant: "gradient" | "outline" | "glass";
  onBackgroundTypeChange: (type: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onLinkVariantChange: (variant: "gradient" | "outline" | "glass") => void;
}

export const CustomizationPanel = ({
  backgroundType,
  backgroundColor,
  linkVariant,
  onBackgroundTypeChange,
  onBackgroundColorChange,
  onLinkVariantChange,
}: CustomizationPanelProps) => {
  const gradientOptions = [
    { name: "Roxo", value: "gradient-primary" },
    { name: "Azul", value: "gradient-secondary" },
    { name: "Pôr do Sol", value: "gradient-sunset" },
    { name: "Oceano", value: "gradient-ocean" },
  ];

  const linkStyles = [
    { name: "Gradiente", value: "gradient" as const },
    { name: "Outline", value: "outline" as const },
    { name: "Vidro", value: "glass" as const },
  ];

  return (
    <Card className="p-6 space-y-6 shadow-elegant">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Fundo</h3>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              variant={backgroundType === "gradient" ? "default" : "outline"}
              size="sm"
              onClick={() => onBackgroundTypeChange("gradient")}
            >
              Gradiente
            </Button>
            <Button
              variant={backgroundType === "solid" ? "default" : "outline"}
              size="sm"
              onClick={() => onBackgroundTypeChange("solid")}
            >
              Cor Sólida
            </Button>
          </div>

          {backgroundType === "gradient" && (
            <div className="grid grid-cols-2 gap-2">
              {gradientOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onBackgroundColorChange(option.value)}
                  className={`h-12 rounded-lg ${option.value} transition-smooth hover:scale-105 ${
                    backgroundColor === option.value ? "ring-4 ring-primary ring-offset-2" : ""
                  }`}
                  aria-label={option.name}
                >
                  <span className="text-white font-medium text-sm">{option.name}</span>
                </button>
              ))}
            </div>
          )}

          {backgroundType === "solid" && (
            <div className="space-y-2">
              <Label htmlFor="bg-color">Cor de Fundo</Label>
              <Input
                id="bg-color"
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="h-12 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Estilo dos Links</h3>
        </div>
        <div className="flex gap-2">
          {linkStyles.map((style) => (
            <Button
              key={style.value}
              variant={linkVariant === style.value ? "default" : "outline"}
              size="sm"
              onClick={() => onLinkVariantChange(style.value)}
            >
              {style.name}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
