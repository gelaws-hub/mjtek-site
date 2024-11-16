import MainComponentSim from "./components/MainComponentSim";
import StorageComponentSim from "./components/StorageComponentSim";

export default function Simulasi() {
  return (
    <div className="container mx-auto p-4 xl:max-w-[60%] min-h-screen">
      <MainComponentSim />
      {/* <StorageComponentSim /> */}
    </div>
  );
}