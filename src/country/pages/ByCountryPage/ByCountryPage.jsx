import { useContext } from "react";
import { countryContext } from "../../context/country/countryContext.js";
import {  CardCountry  } from "../../components/CardCountry";
import { Loader } from "../../components/Loader.jsx";


export const ByCountryPage = () => {

  const {countriesByCont, loaderGetCountries} = useContext(countryContext);

  if(loaderGetCountries) return <Loader/>


  return (
    <section>
      <div className="mx-auto container p-[15px]">
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
