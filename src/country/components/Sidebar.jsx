import { useContext } from "react";
import { NavLink } from "react-router-dom"
import { sidebarContext } from "../context/sidebar/sidebarContext";
import { countryContext } from "../context/country/countryContext";
import homeIcon from "../../shared/assets/home-icon.svg";
import historyIcon from "../../shared/assets/history-icon.svg";

export const Sidebar = () => {
  const {valueSidebar, handleSidebar} = useContext(sidebarContext);
  const {historyCountries} = useContext(countryContext);

  if (!valueSidebar) return null;
  return (
    <>
      <div className="fixed top-0 left-0 z-[45] w-full h-screen bg-[#000] bg-opacity-20 lg:hidden" onClick={handleSidebar}></div>
      <aside className="fixed top-0 left-0 z-50 w-72 h-screen transition-transform bg-[#1C274C] animate__animated animate__slideInLeft">
        <div className="h-full px-3 py-4 overflow-y-auto text-white">
          <div className="flex flex-col">
            <h3 className="text-[25px] w-full font-bold px-2 pb-4 relative border-b-2 mb-4">Country App</h3>
            <NavLink
              to="/" 
              className={({isActive}) => isActive ? "p-2 rounded-lg bg-slate-700 group text-white flex" : "p-2 rounded-lg hover:bg-gray-700 group flex"}>
              <img src={homeIcon} width={25} alt="" />
              <span className="text-[20px] ml-5 flex items-end">Home</span>
            </NavLink>
            <div className="flex p-2">
              <img src={historyIcon} width={25} alt="" />
              <span className="text-[20px] ml-5">
                Historial
              </span>
            </div>
            <ul className="pl-14 pr-3 space-y-2">
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
