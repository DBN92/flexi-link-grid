import { useState, useEffect } from "react";
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
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  // Detectar retorno do pagamento
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment_status');
    const orderNsu = urlParams.get('order_nsu');
    
    // Se há parâmetros de pagamento na URL, mostrar mensagem de agradecimento
    if (paymentStatus || orderNsu?.includes('sapatinho_gravata_')) {
      setShowThankYouMessage(true);
      
      // Limpar a URL após 3 segundos
      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 3000);
      
      // Esconder mensagem após 8 segundos
      setTimeout(() => {
        setShowThankYouMessage(false);
      }, 8000);
    }
  }, []);

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
    
    // URL de redirecionamento inteligente baseada no ambiente
    let redirectUrl = window.location.origin;
    
    // Detectar ambiente e configurar URL apropriada
    if (redirectUrl.includes('localhost') || redirectUrl.includes('127.0.0.1')) {
      // Desenvolvimento local - simular retorno do pagamento
      redirectUrl = `${redirectUrl}/?payment_status=success&order_nsu=sapatinho_gravata_${Date.now()}`;
    } else if (redirectUrl.includes('casamentond.danieltechsolutions.com')) {
      // Produção - usar URL de produção
      redirectUrl = 'https://casamentond.danieltechsolutions.com/';
    } else {
      // Outros ambientes (Vercel, etc.) - usar URL atual
      redirectUrl = `${redirectUrl}/`;
    }
    
    return `https://checkout.infinitepay.io/?handle=danielbn92&items=${items}&order_nsu=sapatinho_gravata_${Date.now()}&redirect_url=${encodeURIComponent(redirectUrl)}`;
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
      
      {/* Mensagem de agradecimento pós-pagamento */}
      {showThankYouMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Pagamento Confirmado!
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Muito obrigado pela colaboração ;)
            </p>
            <p className="text-sm text-gray-500">
              Sua contribuição significa muito para nós! ❤️
            </p>
          </div>
        </div>
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
