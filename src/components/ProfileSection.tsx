import { Heart } from "lucide-react";

interface ProfileSectionProps {
  name: string;
  bio: string;
}

export const ProfileSection = ({ name, bio }: ProfileSectionProps) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 sm:space-y-3 backdrop-blur-sm bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl max-w-4xl overflow-hidden">
        <div className="h-24 sm:h-32 overflow-hidden relative">
          <div className="text-white/95 text-sm sm:text-base font-medium leading-relaxed whitespace-pre-line animate-scroll-4lines">
            {name}
            {name}
          </div>
        </div>
        {bio && (
          <p className="text-white/95 text-base sm:text-lg max-w-md font-medium leading-relaxed">
            {bio}
          </p>
        )}
        
        {/* Romantic decorative line */}
        <div className="flex items-center justify-center space-x-2 pt-1 sm:pt-2">
          <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent flex-1"></div>
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-300" />
          <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent flex-1"></div>
        </div>
      </div>
    </div>
  );
};
