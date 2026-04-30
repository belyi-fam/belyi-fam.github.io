const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl shadow-purple-900/20">
    {children}
  </div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-8 md:p-10">
    {children}
  </div>
);

export { Card, CardContent };
