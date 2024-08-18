import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen">
      <div className="h-[80px] w-full fixed inset-y-0">
        <Navbar />
      </div>
      {/* <div className="hidden md:flex w-56 h-full flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div> */}
      <main className="w-full mt-[80px] pt-6 lg:px-20">{children}</main>
    </div>
  );
};

export default DashboardLayout;
