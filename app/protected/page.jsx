import PanZoomSvg from '../components/SVGComponent';
import Image from "next/image";
import PanZoomSvg from "./components/SVGComponent";
import Categories from "./components/categories";
import withAuth from '../components/withAuth';
//import withAuth from '../hoc/withAuth';

const ProtectedPage = () => {
    return (
        <main className="flex flex-col min-h-screen items-center justify-between bg-slate-200">
          <div className="flex flex-col lg:flex-row w-full h-screen">
            <div className="lg:w-[300px] w-full h-full p-4 order-2 lg:order-none space-y-12">
              <div className="pt-4">
                <Image src="/logo.png" alt="Logo" width={300} height={100} objectFit="contain"/>
              </div>
              <Categories/>
              
            </div>
            <div className="flex-grow flex items-center justify-center order-1 lg:order-none bg-white ">
              <PanZoomSvg />
            </div>
          </div>
        </main>
      );
};

export default withAuth(ProtectedPage);
