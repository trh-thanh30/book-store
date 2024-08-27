"use client";

import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiChartPie } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaBook, FaUsers } from "react-icons/fa";
export default function DashSideBar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=dash"}>
            <Sidebar.Item
              label="Admin"
              labelColor="dark"
              as="div"
              icon={HiChartPie}
              active={tab === "dash" || !tab}
            >
              Dashboard
            </Sidebar.Item>
          </Link>

          <Link to={"/dashboard?tab=books"}>
            <Sidebar.Item active={tab === "books"} icon={FaBook} as="div">
              Books
            </Sidebar.Item>
          </Link>

          <Link to={"/dashboard?tab=categories"}>
            <Sidebar.Item
              as="div"
              active={tab === "categories"}
              icon={MdCategory}
            >
              Categories
            </Sidebar.Item>
          </Link>

          <Link to={"/dashboard?tab=users"}>
            <Sidebar.Item as="div" active={tab === "users"} icon={FaUsers}>
              {" "}
              Users
            </Sidebar.Item>
          </Link>

          <div className="flex items-center gap-2 p-2 text-slate-500 text-base border-t border-solid cursor-pointer hover:!text-red-500 hover:bg-red-50 border-slate-300">
            <div>
              <FaArrowLeftLong className="w-5 h-5 "></FaArrowLeftLong>
            </div>
            <span>Sign Out</span>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
