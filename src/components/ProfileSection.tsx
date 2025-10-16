import { Heart } from "lucide-react";

interface ProfileSectionProps {
  name: string;
  bio: string;
}

export const ProfileSection = ({ name, bio }: ProfileSectionProps) => {
  return (
    <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-3 backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl max-w-4xl overflow-hidden">
        <div className="h-32 overflow-hidden relative">
          <div className="text-white/95 text-base font-medium leading-relaxed whitespace-pre-line animate-scroll">
            {name}
          </div>
        </div>
        {bio && (
          <p className="text-white/95 text-lg max-w-md font-medium leading-relaxed">
            {bio}
          </p>
        )}
        
        {/* Romantic decorative line */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent flex-1"></div>
          <Heart className="w-4 h-4 text-pink-300" />
          <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent flex-1"></div>
        </div>
      </div>
    </div>
  );
};
