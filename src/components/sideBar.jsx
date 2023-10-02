"use client";
import Image from "next/image";
import MainIcon from "@/assets/icons/building-store.svg";
import img1 from "@/assets/control.png";
import img3 from "@/assets/Chart_fill.png";
import img4 from "@/assets/Chat.png";
import img6 from "@/assets/Calendar.png";
import img8 from "@/assets/Chart.png";
import img10 from "@/assets/Setting.png";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, toggleSideNav } from "@/redux/currentPageSlice";

export const SideBar = () => {
  const { pageID,sideNavOpen } = useSelector((state) => state.currentPage.value);
  const dispatch = useDispatch();
  const Menus = [
    { pageID: 0, title: "Ordenes", src: img3 },
    { pageID: 1, title: "Nueva Orden", src: img4 },
    { pageID: 2, title: "Gestion de Productos ", src: img6, gap: true },
    { pageID: 3, title: "Informes", src: img8 },
    { pageID: 4, title: "Configuracion", src: img10, gap: true },
  ];

  return (
    <div id="SideBar" className="flex fixed">
      <div
        className={` ${
          sideNavOpen ? "w-48" : "w-20 "
        } bg-t1-blue-400 h-screen p-5  pt-8 relative duration-300`}
      >
        <Image
          alt=""
          src={img1}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-t1bg-t1-blue-400
           border-2 rounded-full  ${!sideNavOpen && "rotate-180"}`}
          onClick={() => dispatch(toggleSideNav())}
        />
        <div className="flex gap-x-4 items-center">
          <MainIcon
            id="MainIcon"
            className={`cursor-pointer duration-500 ${
              sideNavOpen && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !sideNavOpen && "scale-0"
            }`}
          >
            Admin
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
              ${Menu.gap ? "mt-14" : "mt-2"} ${
                index === pageID && "bg-t1-blue-300"
              } `}
              onClick={() => dispatch(setCurrentPage(Menu.pageID))}
            >
              <Image alt="" src={Menu.src} />
              <span className={`${!sideNavOpen && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};