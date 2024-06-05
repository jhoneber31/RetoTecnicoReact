import { Route, Routes } from "react-router-dom"
import { ByCountryPage } from "../country/pages/ByCountryPage/ByCountryPage"
import { CountryPage } from "../country/pages/CountryPage/CountryPage"
import { CountrySearch } from "../country/pages/CountrySearch/CountrySearch"

export const  AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ByCountryPage/>}/>
      <Route path="/country/:code" element={<CountryPage/>}/>
      <Route path="/search/:value" element={<CountrySearch/>}/>
    </Routes>
  )
}
