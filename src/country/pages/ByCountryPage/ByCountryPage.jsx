import { useContext } from "react";
import { countryContext } from "../../context/country/countryContext.js";
import {  CardCountry  } from "../../components/CardCountry";


export const ByCountryPage = () => {

  const {countriesByCont} = useContext(countryContext);

  return (
    <section>
      <div className="mx-auto container px-[15px]">
        <div className="grid grid-cols-1 gap-3 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center">
          {
            countriesByCont.map((country, index) => (
              <CardCountry key={index} {...country}/>
            ))
          }
        </div>
      </div>
    </section>
  )
}
