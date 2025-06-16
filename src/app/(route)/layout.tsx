import Breadcrumps from "./_componenta/breadcrumps";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumps />
      {children}
    </div>
  );
}
