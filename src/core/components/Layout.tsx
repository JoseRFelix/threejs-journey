interface LayoutProps {
  header?: React.ReactNode;
  content?: React.ReactNode;
}

const Layout = ({ header, content }: LayoutProps) => {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <header>{header}</header>
      <main className="container flex flex-col flex-1 mx-auto">{content}</main>
    </div>
  );
};

export default Layout;
