import { useContext } from "react";
import { NavLink } from "react-router-dom"
import { sidebarContext } from "../../hooks/sidebarContext";

export const Sidebar = () => {
  const {valueSidebar, handleSidebar} = useContext(sidebarContext);

  if (!valueSidebar) return null;
  return (
    <>
      <div className="fixed top-0 left-0 z-[45] w-full h-screen bg-[#000] bg-opacity-20 lg:hidden" onClick={handleSidebar}></div>
      <aside className="fixed top-0 left-0 z-50 w-64 h-screen transition-transform bg-red-500 animate__animated animate__slideInLeft">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex flex-col">
            <h3 className="text-[18px] font-bold p-2">Country App</h3>
            <NavLink className="p-2 rounded-lg hover:bg-gray-700 group">
              Por Capital
            </NavLink>
            <NavLink className="p-2 rounded-lg hover:bg-gray-700 group">
              Por País
            </NavLink>
            <NavLink className="p-2 rounded-lg hover:bg-gray-700 group">
              Por Región
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  )
}