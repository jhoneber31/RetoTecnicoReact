import { useEffect, useState } from 'react'
import {countryContext} from './countryContext'
import { gql, useQuery } from '@apollo/client'
import { getImageByName } from '../../../hooks/getImageByName'


const GET_COUNTRIES_BY_CONTINENT = gql`
  query GetCountriesByContinent($codeContinent: String!) {
    countries(filter: {continent: {in: [$codeContinent]}}) {
      name
      continent {
        name
      }
    }
  }
`

// eslint-disable-next-line react/prop-types
export const CountryProvider = ({children}) => {

  const [codeContinent, setCodeContinent] = useState("SA");
  const [countriesByCont, setCountriesByCont] = useState([]);

  const {data, error, loading} = useQuery(GET_COUNTRIES_BY_CONTINENT, { variables: {codeContinent}});

  const { getFlagByName, getImageCityByName } = getImageByName();


  const getCountries = async () => {
    if (data) {
      const promise = data.countries.map(async(country) => {
        const flag = await getFlagByName(country.name);
        const city = await getImageCityByName(country.name);
        return {...country, flag, city}
      });
      const results = await Promise.all(promise);
      console.log("resultados",results)
      setCountriesByCont(results);
    }
  }

  useEffect(() => {
    getCountries();
  }, [data])
  



  return (
    <countryContext.Provider value={{codeContinent}}>
      {children}
    </countryContext.Provider>
  )
}
