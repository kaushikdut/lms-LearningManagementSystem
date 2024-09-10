import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen overflow-x-hidden bg-neutral-100">
      <div className=" h-[80px] w-full md:pl-56 z-50">
        <Navbar />
      </div>

      <div className="fixed group inset-y-0 z-50 hidden h-full w-56 flex-col md:flex ">
        <Sidebar />
      </div>
      <main className=" w-full h-full pl-2  md:pl-56">{children}</main>
    </div>
  );
};

export default DashboardLayout;
