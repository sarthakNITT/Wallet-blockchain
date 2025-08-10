export function BackgroundAnimation() {
  return (
    <div className="floating-bg">
      {/* Subtle floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/[0.01] floating-orb fade-pulse" />
      <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-white/[0.015] floating-orb fade-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-40 w-40 h-40 rounded-full bg-white/[0.008] floating-orb fade-pulse" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-20 w-28 h-28 rounded-full bg-white/[0.012] floating-orb fade-pulse" style={{ animationDelay: '6s' }} />
      
      {/* Drifting particles */}
      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white/[0.05] drift" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white/[0.03] drift" style={{ animationDelay: '5s' }} />
      <div className="absolute top-3/4 left-3/4 w-1.5 h-1.5 rounded-full bg-white/[0.04] drift" style={{ animationDelay: '10s' }} />
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
    </div>
  );
}