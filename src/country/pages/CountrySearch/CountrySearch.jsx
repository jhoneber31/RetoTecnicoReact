import { useParams } from "react-router-dom"
import { CardCountry } from "../../components/CardCountry"
import { useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "../../components";
import { CountryNotFound } from "../../components/CountryNotFound";
import { getImageByName } from "../../../hooks/getImageByName";
import { countryContext } from "../../context/country/countryContext";

const SEARCH_COUNTRY = gql`
query SearchCountry($name: String!) {
  countries(filter: {name: {regex: $name}}) {
    name
    code
    continent {
      name
    }
  }
}
`

export const CountrySearch = () => {

  const [searchCountry, setSearchCountry] = useState([])
  const [loader, setloader] = useState(true);

  const {value} = useParams();

  const { getCountryInfo } = getImageByName();

  const { handleContinet } = useContext(countryContext);

  const searchValue = value.charAt(0).toUpperCase() + value.slice(1);

  const {data, loading} = useQuery(SEARCH_COUNTRY,{variables: {name: searchValue}});

  useEffect(() => {
    const getCountry = async () =>{
      handleContinet('');
      if(data && data.countries) {
        const promise = data.countries.map(async(country) => {
          const {flag, city} = await getCountryInfo(country.name);
          return {...country, flag, city}
        })
        const result = await Promise.all(promise);
        setSearchCountry(result);
        setloader(false);
      }
    }
    getCountry();
  }, [data])
  
  if(!loading && data.countries.length === 0) return <CountryNotFound/>


  return (
    <section>
    <div className="mx-auto container px-[15px]">
      {
        loader ? <Loader/> :
        <div className="grid grid-cols-1 gap-3 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center">
          {
            searchCountry.map((country, index) => (
              <CardCountry key={index} {...country}/>
            ))
          }
        </div>
      }
    </div>
  </section>
  )
}
