import { useEffect, useState } from 'react'
import {countryContext} from './countryContext'
import { gql, useQuery } from '@apollo/client'
import { getImageByName } from '../../../hooks/getImageByName'

const GET_COUNTRIES_BY_CONTINENT = gql`
  query GetCountriesByContinent($codeContinent: String!) {
    countries(filter: {continent: {in: [$codeContinent]}}) {
      name
      code
      continent {
        name
      }
    }
  }
`

export const GET_COUNTRY_BY_CODE = gql`
  query GetCountryByCode($codeC: ID!) {
    country(code: $codeC) {
      name
      capital
      code
      continent {
        name
      }
      currencies
      phone
      native
      awsRegion
      languages{
        name
      }
      states{
        name
      }
      subdivisions {
        name
      }
    }
  }
`
export const SEARCH_COUNTRY = gql`
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
// eslint-disable-next-line react/prop-types
export const CountryProvider = ({children}) => {

  const [codeContinent, setCodeContinent] = useState("SA");
  const [countriesByCont, setCountriesByCont] = useState([]);
  const [historyCountries, setHistoryCountries] = useState([])

  const resultCountries = useQuery(GET_COUNTRIES_BY_CONTINENT, { variables: {codeContinent}});

  const { getFlagByName, getImageCityByName } = getImageByName();

  const getCountries = async () => {
    const {data} = resultCountries;
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

  const getCountryInfo =async(name) => {
    const flag = await getFlagByName(name);
    const city = await getImageCityByName(name);
    const result = {flag, city}
    return result;
  }

  const handleContinet = (code) => {
    setCodeContinent(code);
  }

  const updateHistory = (country) => {
    let history = [...historyCountries];
    if(historyCountries.some(c => c.code === country.code)) {
      history = history.filter(c => c.code !== country.code);
      setHistoryCountries([...history]);
    }
    history.unshift(country);
    history = history.slice(0, 5);
    setHistoryCountries([...history]);
    localStorage.setItem('history', JSON.stringify(history));
  }

  useEffect(() => {
    getCountries();
  }, [resultCountries.data, codeContinent])

  useEffect(() => {
    if(!localStorage.getItem('history')) return;
    setHistoryCountries(JSON.parse(localStorage.getItem('history')));
  }, [])
  
  return (
    <countryContext.Provider value={{countriesByCont, getCountryInfo, handleContinet, codeContinent, historyCountries, updateHistory}}>
      {children}
    </countryContext.Provider>
  )
}
