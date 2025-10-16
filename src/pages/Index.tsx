import { useState } from "react";
import { Settings } from "lucide-react";
import { LinkCard } from "@/components/LinkCard";
import { ProfileSection } from "@/components/ProfileSection";
import { CustomizationPanel } from "@/components/CustomizationPanel";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const [backgroundType, setBackgroundType] = useState("gradient");
  const [backgroundColor, setBackgroundColor] = useState("gradient-primary");
  const [linkVariant, setLinkVariant] = useState<"gradient" | "outline" | "glass">("outline");

  // Profile data - pode ser personalizado depois
  const profile = {
    name: "Seu Nome",
    bio: "Criador de conteúdo • Designer • Desenvolvedor",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  };

  // Links - pode ser personalizado depois
  const links = [
    { id: 1, title: "📱 Instagram", url: "https://instagram.com" },
    { id: 2, title: "🐦 Twitter", url: "https://twitter.com" },
    { id: 3, title: "💼 LinkedIn", url: "https://linkedin.com" },
    { id: 4, title: "🎵 Spotify", url: "https://spotify.com" },
    { id: 5, title: "🎥 YouTube", url: "https://youtube.com" },
  ];

  const getBackgroundStyle = () => {
    if (backgroundType === "gradient") {
      return backgroundColor;
    }
    return "";
  };

  const getBackgroundColor = () => {
    if (backgroundType === "solid") {
      return { backgroundColor };
    }
    return {};
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 ${getBackgroundStyle()}`}
      style={getBackgroundColor()}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="glass" size="icon" className="shadow-glow">
                <Settings className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Personalização</SheetTitle>
                <SheetDescription>
                  Customize o visual do seu Linktree
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <CustomizationPanel
                  backgroundType={backgroundType}
                  backgroundColor={backgroundColor}
                  linkVariant={linkVariant}
                  onBackgroundTypeChange={setBackgroundType}
                  onBackgroundColorChange={setBackgroundColor}
                  onLinkVariantChange={setLinkVariant}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="space-y-8">
          <ProfileSection
            name={profile.name}
            bio={profile.bio}
            avatarUrl={profile.avatarUrl}
          />

          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {links.map((link, index) => (
              <div
                key={link.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100 + 300}ms` }}
              >
                <LinkCard
                  title={link.title}
                  url={link.url}
                  variant={linkVariant}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
