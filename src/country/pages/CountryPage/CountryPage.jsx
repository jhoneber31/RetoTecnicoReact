import {  useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "../../components/Loader";
import { getImageByName } from "../../../hooks/getImageByName";
import { countryContext } from "../../context/country/countryContext";

const GET_COUNTRY_BY_CODE = gql`
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

export const CountryPage = () => {

  const [country, setCountry] = useState({});
  const [loader, setLoader] = useState(true);

  const { getCountryInfo } = getImageByName();
  const { code } = useParams();
  const navigate = useNavigate();

  const { handleContinet } = useContext(countryContext);

  const {data, loading} = useQuery(GET_COUNTRY_BY_CODE, {variables: { codeC: code}})

  useEffect(() => {
    const getCountry =  async () => {
      handleContinet('');
      if(data && data.country) {
        const {flag, city} = await getCountryInfo(data.country.name);
        setCountry({...data.country, flag, city});
        setLoader(false);
      }
    }
    if(!loading && !data.country) navigate('/');

    getCountry();
  }, [data])

  if(loader) return <Loader/>
    
  return (
    <section>
      <div className="container mx-auto p-6 flex justify-center">
        <div className="grid grid-cols-1 border-2 rounded-lg border-gray-500 max-w-72 md:grid-cols-2 md:max-w-full lg:max-w-[80%]">
          <div className="col-span-1">
            <img src={country.city} alt="country-city" className='rounded-t-lg max-h-[248px] bg-cover md:rounded-bl-lg md:rounded-tr-none md:max-h-full md:h-full'/>
          </div>
          <div className="col-span-1 lg:px-10 lg:py-5">
            <div className="flex gap-x-2 w-full items-center border-2 p-2 border-y-gray-500 md:border-none md:pt-2">
              <img src={country.flag} alt="country-flag" className="w-[60px] h-[40px] object-contain lg:w-[120px] lg:h-[80px]" />
              <div>
                <h2 className='font-bold text-[18px] lg:text-[20px]'>{country.name}</h2>
                <span>{country.continent?.name}</span>
              </div>
            </div>
            <ul className="space-y-4 p-2 lg:space-y-4">
              <li className="flex justify-between">
                <span className="font-bold">Capital</span>
                <span>{country.capital}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-bold">Phone</span>
                <span>+{country.phone}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-bold">Native</span>
                <span>{country.native}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-bold">AWS Region:</span>
                <span>{country.awsRegion}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-bold">Currencies:</span>
                <ul className="flex flex-col gap-y-2 list-disc">
                  {country.currencies?.map((currency, index) => <li key={index}>{currency}</li>)}
                </ul>
              </li>
              <li className="flex justify-between">
                <span className="font-bold">Languages:</span>
                <ul className="flex flex-col gap-y-2 list-disc">
                  {country.languages?.map((lang, index) => <li key={index}>{lang.name}</li>)}
                </ul>
              </li>
              {
                country.states?.length > 0 && (
                  <li className="flex flex-col gap-y-1">
                    <span className="font-bold">States:</span>
                    <select name="States" className="border-2">
                      {country.states?.map((state, index) => (<option key={index} value={state.name}>{state.name}</option>))}
                    </select>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
