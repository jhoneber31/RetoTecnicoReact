import { useContext } from "react";
import { NavLink } from "react-router-dom"
import { sidebarContext } from "../context/sidebar/sidebarContext";
import { countryContext } from "../context/country/countryContext";

export const Sidebar = () => {
  const {valueSidebar, handleSidebar} = useContext(sidebarContext);
  const {historyCountries} = useContext(countryContext);

  if (!valueSidebar) return null;
  return (
    <>
      <div className="fixed top-0 left-0 z-[45] w-full h-screen bg-[#000] bg-opacity-20 lg:hidden" onClick={handleSidebar}></div>
      <aside className="fixed top-0 left-0 z-50 w-64 h-screen transition-transform bg-[#1EBAD6] animate__animated animate__slideInLeft">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex flex-col">
            <h3 className="text-[18px] font-bold p-2">Country App</h3>
            <NavLink
              to="/" 
              className={({isActive}) => isActive ? "p-2 rounded-lg bg-slate-700 group text-white" : "p-2 rounded-lg hover:bg-gray-700 group"}>
              Home
            </NavLink>
            <span className="text-[18px] font-bold p-2">Historial</span>
            <ul className="px-4 space-y-2">
              {
                historyCountries.length > 0 && historyCountries.map((country) => (
                  <li key={country.code} className="w-full">
                    <NavLink
                      to={`/country/${country.code}`}
                      className={({isActive}) => isActive ? "p-1.5 rounded-lg bg-slate-700 group text-white w-full block " : "p-1.5 rounded-lg   hover:text-white hover:bg-gray-700 group w-full block"}
                    >
                      {country.name}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </aside>
    </>
  )
}
