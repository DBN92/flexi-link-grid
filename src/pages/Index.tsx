import { useState } from "react";
import { LinkCard } from "@/components/LinkCard";
import { ProfileSection } from "@/components/ProfileSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [backgroundType, setBackgroundType] = useState("image");
  const [backgroundColor, setBackgroundColor] = useState("gradient-primary");
  const [linkVariant, setLinkVariant] = useState<"gradient" | "outline" | "glass">("outline");
  const [customAmount, setCustomAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Profile data - pode ser personalizado depois
  const profile = {
    name: "Gostaríamos de expressar nosso mais profundo agradecimento por terem compartilhado conosco um dos momentos mais especiais das nossas vidas.\n\nA presença de cada um de vocês tornou o nosso casamento ainda mais inesquecível. Sentir o carinho, o amor e a energia de todos foi um presente que levaremos para sempre no coração.\n\nObrigado por celebrarem conosco esse início de nova fase. Que possamos seguir cultivando essa conexão e vivendo muitos outros momentos felizes juntos!\n\nCom todo o nosso carinho,\nNatalia & Daniel\n\n💍 17.10.2025",
    bio: "",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  };

  // Função para gerar o link do checkout com valor customizado
  const generateCheckoutLink = (amount: number) => {
    const priceInCents = Math.round(amount * 100); // Converter para centavos
    const items = encodeURIComponent(JSON.stringify([{
      "name": "Sapatinho/Gravata",
      "price": priceInCents,
      "quantity": 1
    }]));
    
    return `https://checkout.infinitepay.io/danielbezerra?items=${items}&order_nsu=sapatinho_gravata_${Date.now()}&redirect_url=https://flexi-link-grid.vercel.app/`;
  };

  // Função para lidar com o pagamento customizado
  const handleCustomPayment = () => {
    const amount = parseFloat(customAmount.replace(",", "."));
    
    if (isNaN(amount) || amount <= 0) {
      alert("Por favor, insira um valor válido maior que zero.");
      return;
    }

    if (amount < 1) {
      alert("O valor mínimo é R$ 1,00.");
      return;
    }

    const checkoutUrl = generateCheckoutLink(amount);
    window.open(checkoutUrl, "_blank");
    setIsDialogOpen(false);
    setCustomAmount("");
  };

  // Função para formatar o valor enquanto o usuário digita
  const formatCurrency = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");
    
    // Converte para formato de moeda
    const amount = parseFloat(numbers) / 100;
    
    if (isNaN(amount)) return "";
    
    return amount.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Função para lidar com a mudança no input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setCustomAmount(formatted);
  };

  // Links - PIX e Cartão de Crédito com valor customizável
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
      url: "custom-payment", // URL especial para indicar pagamento customizado
      type: "custom-payment" as const
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
            <div key={index}>
              {link.type === "custom-payment" ? (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <LinkCard {...link} onCustomPayment={() => setIsDialogOpen(true)} />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Valor do Presente</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Digite o valor que deseja contribuir:</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                          <Input
                            id="amount"
                            type="text"
                            placeholder="0,00"
                            value={customAmount}
                            onChange={handleAmountChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCustomPayment}>
                          Pagar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <LinkCard {...link} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
