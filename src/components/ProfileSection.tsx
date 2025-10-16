import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileSectionProps {
  name: string;
  bio: string;
  avatarUrl: string;
}

export const ProfileSection = ({ name, bio, avatarUrl }: ProfileSectionProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Avatar className="w-24 h-24 border-4 border-white/20 shadow-glow">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">{name}</h1>
        <p className="text-white/90 text-base max-w-md">{bio}</p>
      </div>
    </div>
  );
};
