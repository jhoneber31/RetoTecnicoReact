import { useEffect, useState } from 'react';
import { getImageByName } from '../../hooks/getImageByName';

export const CardCountry = ({...country}) => {

  const [urlFlag, setUrlFlag] = useState(null);
  const [urlCity, setUrlCity] = useState(null);

  const {name} = country;

  const {getFlagByName, getImageCityByName} = getImageByName();

  useEffect(() => {
    const getFlag = async() => {
      try {
        const flag = await getFlagByName(name);
        setUrlFlag(flag);
      }catch(error) {
        console.log(error)
      }
    }

    const getCity = async() => {
      try {
        const city = await getImageCityByName(name);
        setUrlCity(city);
      }catch(error) {
        console.log(error)
      }
    }

    getFlag();
    getCity();
  }, [])

  return (
    <div className="col-span-1 w-full mx-auto" >
      <div className='max-w-72 rounded-lg border-2 mx-auto cursor-pointer flex flex-col'>
        <img src={urlCity} alt="picture" className='rounded-t-lg max-h-[172px] bg-cover'/>
        <div className='p-2 flex items-center'>
          <img src={urlFlag} alt="flag" className="w-[40px] h-[30px] object-cover" />
          <div className='flex flex-col ml-3'>
            <span className='font-bold text-[18px]'>{country.name}</span>
            <span>{country.continent.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
