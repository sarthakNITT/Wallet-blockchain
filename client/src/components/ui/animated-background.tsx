export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-space via-slate-dark to-space opacity-90"></div>
      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-electric rounded-full animate-float opacity-60"></div>
      <div 
        className="absolute top-40 right-20 w-1 h-1 bg-green-neon rounded-full animate-float opacity-40" 
        style={{ animationDelay: '1s' }}
      ></div>
      <div 
        className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-glow rounded-full animate-float opacity-50" 
        style={{ animationDelay: '2s' }}
      ></div>
      <div 
        className="absolute top-60 right-1/3 w-1 h-1 bg-cyan-electric rounded-full animate-float opacity-30" 
        style={{ animationDelay: '3s' }}
      ></div>
      <div 
        className="absolute bottom-20 right-10 w-2 h-2 bg-green-neon rounded-full animate-float opacity-70" 
        style={{ animationDelay: '0.5s' }}
      ></div>
    </div>
  );
}
