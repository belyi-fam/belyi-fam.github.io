const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-8 border border-gray-300 rounded-lg shadow-md">
      {children}
    </div>
  );
  
const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6">
    {children}
  </div>
);

export { Card, CardContent };