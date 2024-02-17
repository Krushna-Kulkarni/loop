import React from "react";
import { tabs } from "../utils/constants";

const Sidebar = () => {
  let selectedTab = "Home";
  return (
    <div className="flex flex-col overflow-y-auto  h-[90dvh] fixed w-64">
      {tabs.map((tab) => (
        <button
          className="flex justify-start items-center  cursor-pointer bg-transparent px-4 py-3 pl-8   hover:bg-zinc-800 font-light"
          key={tab.name}
          style={{
            backgroundColor: tab.name === selectedTab && "#27272a",
            fontWeight: tab.name === selectedTab && "500",
          }}
        >
          <span className="mr-4">{tab.icon}</span>
          <span className="flex items-center">{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
