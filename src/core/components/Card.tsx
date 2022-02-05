const Card: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col space-y-1 px-2 py-3 bg-white rounded-lg shadow-md max-w-xs w-full">
      {children}
    </div>
  );
};

const CardTitle: React.FC = ({ children }) => {
  return <h1 className="font-bold text-lg">{children}</h1>;
};

const CardSubtitle: React.FC = ({ children }) => {
  return <h2 className="">{children}</h2>;
};

const CardContent: React.FC = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export { Card, CardTitle, CardSubtitle, CardContent };
