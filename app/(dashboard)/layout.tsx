import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="h-[80px] w-full z-50">
        <Navbar />
      </div>
      <div className="w-full h-full flex relative">
        <div className="absolute z-50 hidden h-full w-56 flex-col md:flex">
          <Sidebar />
        </div>
        <main className=" w-full h-full ml-56 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
