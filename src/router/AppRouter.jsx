import { Route, Routes } from "react-router-dom"
import { ByCountryPage } from "../country/pages/ByCountryPage/ByCountryPage"
import { CountryPage } from "../country/pages/CountryPage/CountryPage"
import { SearchBox, Sidebar } from "../country/components"
import { SidebarProvider } from "../hooks/SidebarProvider"

export const AppRouter = () => {
  return (
    <SidebarProvider>
      <Sidebar/>
      <div className="home lg:pl-64 pt-[80px]">
        <SearchBox/>
        <Routes>
          <Route path="/" element={<ByCountryPage/>}/>
          <Route path="/countryInfo" element={<CountryPage/>}/>
        </Routes>
      </div>
    </SidebarProvider>
  )
}
