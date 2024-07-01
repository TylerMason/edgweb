import Image from "next/image";
import PanZoomSvg from "./components/SVGComponent";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between bg-slate-200">
      <div className="flex flex-col lg:flex-row w-full h-screen">
        <div className="lg:w-[300px] w-full h-full p-4 order-2 lg:order-none ">
          <p>I am the left column</p>
        </div>
        <div className="flex-grow flex items-center justify-center order-1 lg:order-none bg-white ">
          <PanZoomSvg />
        </div>
      </div>
    </main>
  );
}
