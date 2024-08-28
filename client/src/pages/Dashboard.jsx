import { useLocation } from "react-router-dom";
import DashSideBar from "../components/Dash/DashSideBar";
import { useEffect, useState } from "react";
import Books from "../components/Dash/Books";
import Category from "../components/Dash/Category";

export default function Dashboard() {
  const loaction = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(loaction.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [loaction.search]);
  return (
    <>
      <div className="flex flex-col min-h-screen md:flex-row">
        <div className="md:w-56">
          {/* SideBar */}
          <DashSideBar></DashSideBar>
        </div>

        {/* Content */}
        {tab === "dash" && <div className="flex-1 p-4">Content</div>}
        {tab === "books" && <Books></Books>}
        {tab === "categories" && <Category></Category>}
        {tab === "users" && <div className="flex-1 p-4">Content</div>}
        {tab === "task-categories" && <div className="flex-1 p-4">Content</div>}
      </div>
    </>
  );
}
