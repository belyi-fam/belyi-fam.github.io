const Button = ({ children, variant, onClick }: { children: React.ReactNode, variant?: string, onClick?: () => void }) => (
  <button className={`flex items-center px-4 py-2 border-none rounded-md cursor-pointer transition-colors duration-300 ${
    variant === 'outline'
      ? 'bg-transparent border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white'
      : 'bg-purple-700 text-white hover:bg-purple-800'
  }`} onClick={onClick}>
    {children}
  </button>
);

export { Button };
