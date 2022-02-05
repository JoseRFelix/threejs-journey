interface LayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

const Layout = ({ header, content }: LayoutProps) => {
  return (
    <div>
      <header>{header}</header>
      <main className="container mx-auto">{content}</main>
    </div>
  );
};

export default Layout;
