import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { countryContext } from "../context/country/countryContext";

export const CardCountry = ({...country}) => {

  const navigate = useNavigate();
  const{updateHistory} = useContext(countryContext);

  const handleClick = (country) => {
    updateHistory({code :country.code, name:country.name})
    navigate(`/country/${country.code}`)
  }

  return (
    <div className="col-span-1 w-full mx-auto h-full" >
      <div className='max-w-72 rounded-lg border-2 mx-auto cursor-pointer flex flex-col h-full' onClick={() => handleClick(country)}>
        <img src={country.city} alt="picture" className='rounded-t-lg h-[172px] bg-cover'/>
        <div className='p-2 flex items-center'>
          <img src={country.flag} alt="flag" className="w-[40px] h-[30px] object-cover" />
          <div className='flex flex-col ml-3'>
            <span className='font-bold text-[18px]'>{country.name}</span>
            <span>{country.continent.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
