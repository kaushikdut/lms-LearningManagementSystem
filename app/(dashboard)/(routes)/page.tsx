import Header from "../_components/header";
import Main from "./_mainComponents/main";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-20">
      <Header />
      <Main />
    </div>
  );
}
