import { useState } from "react";
import { LinkCard } from "@/components/LinkCard";
import { ProfileSection } from "@/components/ProfileSection";

const Index = () => {
  const [backgroundType, setBackgroundType] = useState("image");
  const [backgroundColor, setBackgroundColor] = useState("gradient-primary");
  const [linkVariant, setLinkVariant] = useState<"gradient" | "outline" | "glass">("outline");

  // Profile data - pode ser personalizado depois
  const profile = {
    name: "Gostaríamos de expressar nosso mais profundo agradecimento por terem compartilhado conosco um dos momentos mais especiais das nossas vidas.\n\nA presença de cada um de vocês tornou o nosso casamento ainda mais inesquecível. Sentir o carinho, o amor e a energia de todos foi um presente que levaremos para sempre no coração.\n\nObrigado por celebrarem conosco esse início de nova fase. Que possamos seguir cultivando essa conexão e vivendo muitos outros momentos felizes juntos!\n\nCom todo o nosso carinho,\nNatalia & Daniel\n\n💍 17.10.2025",
    bio: "",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  };

  // Links - apenas PIX e Cartão de Crédito
  const links = [
    { 
      id: 1, 
      title: "💰 PIX - Copia e Cola", 
      url: "pix-copy", // URL especial para indicar ação de cópia
      type: "pix" as const,
      pixCode: "00020101021126580014BR.GOV.BCB.PIX0136bdeae09c-ba7f-4218-8ae8-71add8cf26c95204000053039865802BR5925DANIEL BEZERRA DO NASCIME6008SAOPAULO61080132305062070503***630455F2"
    },
    { 
      id: 2, 
      title: "Sapatinho/Gravata via Cartão", 
      url: "https://checkout.infinitepay.io/danielbezerra?items=[{\"name\":\"Sapatinho/Gravata\",\"price\":5000,\"quantity\":1}]&order_nsu=sapatinho_gravata_001&redirect_url=https://flexi-link-grid.vercel.app/",
      type: "payment" as const
    },
  ];

  const getBackgroundStyle = () => {
    if (backgroundType === "gradient") {
      return backgroundColor;
    } else if (backgroundType === "image") {
      return "bg-cover bg-center bg-no-repeat";
    }
    return "";
  };

  const getBackgroundColor = () => {
    if (backgroundType === "solid") {
      return { backgroundColor };
    } else if (backgroundType === "image") {
      return { 
        backgroundImage: "url('/couple-background.JPG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
    return {};
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 relative ${getBackgroundStyle()} flex items-end`}
      style={getBackgroundColor()}
    >
      {/* Overlay for better readability */}
      {backgroundType === "image" && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 pointer-events-none" />
      )}
      
      <div className="w-full max-w-md mx-auto px-4">
        <ProfileSection 
          name={profile.name} 
          bio={profile.bio}
        />
        
        <div className="mt-8 space-y-4">
          {links.map((link, index) => (
            <LinkCard key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
