import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen">
      <div className="h-[80px] w-full z-50">
        <Navbar />
      </div>
      <main className="w-full mt-[80px] pt-6 lg:px-20">{children}</main>
    </div>
  );
};

export default DashboardLayout;
