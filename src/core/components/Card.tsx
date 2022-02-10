const Card: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col w-full max-w-xs px-2 py-3 space-y-1 bg-white rounded-lg shadow-md">
      {children}
    </div>
  );
};

const CardTitle: React.FC = ({ children }) => {
  return <h1 className="text-lg font-bold">{children}</h1>;
};

const CardSubtitle: React.FC = ({ children }) => {
  return <h2 className="">{children}</h2>;
};

const CardContent: React.FC = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export { Card, CardTitle, CardSubtitle, CardContent };
