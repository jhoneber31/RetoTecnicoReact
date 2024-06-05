import { useEffect, useState } from "react"
import { sidebarContext } from "./sidebarContext";


export const SidebarProvider = ({children}) => {

  const [valueSidebar, setValueSidebar] = useState(false);

  useEffect(() => {
    const renderWidth = () => {
      if (window.innerWidth >= 1024) {
        setValueSidebar(true);
      } else {
        setValueSidebar(false);
      }
    }
    
    renderWidth();

    window.addEventListener("resize", renderWidth);

    return () => {
      window.removeEventListener('resize', renderWidth);
    }

  }, [])

  const handleSidebar = () => {
    setValueSidebar(!valueSidebar);
  }

  return (
    <sidebarContext.Provider value={{valueSidebar, handleSidebar}}>
      {children}
    </sidebarContext.Provider>
  )
}