const Button = ({ children, variant, onClick }: { children: React.ReactNode, variant?: string, onClick?: () => void }) => (
  <button
    className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-medium tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-purple-300/60 ${
      variant === 'outline'
        ? 'bg-white/10 backdrop-blur-md border border-purple-200/60 text-purple-50 hover:bg-white/20 shadow-lg shadow-purple-900/10'
        : 'bg-gradient-to-r from-purple-400 to-fuchsia-400 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export { Button };
