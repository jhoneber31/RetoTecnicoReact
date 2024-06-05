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

export const CountryProvider = ({children}) => {

  const [codeContinent, setCodeContinent] = useState("EU");
  const [countriesByCont, setCountriesByCont] = useState([]);
  const [historyCountries, setHistoryCountries] = useState([]);
  const [loaderGetCountries, setLoaderGetCountries] = useState(true);

  const resultCountries = useQuery(GET_COUNTRIES_BY_CONTINENT, { variables: {codeContinent}});

  const { getFlagByName, getImageCityByName } = getImageByName();

  const getCountries = async () => {
    setLoaderGetCountries(true);
    if(codeContinent === '') setCodeContinent('EU');
    const {data} = resultCountries;
    if (data && data.countries.length > 0) {
      const promise = data.countries.map(async(country) => {
      const flag = await getFlagByName(country.name);
      const city = await getImageCityByName(country.name);
      return {...country, flag, city}
      });
      const results = await Promise.all(promise);
      setCountriesByCont(results);
      setLoaderGetCountries(false);
    }
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
    <countryContext.Provider value={{countriesByCont, handleContinet, codeContinent, historyCountries, updateHistory, loaderGetCountries}}>
      {children}
    </countryContext.Provider>
  )
}
