import { useContext, useEffect, useRef, useState } from 'react';
import menuHambuger from '../../shared/assets/menu-hambuger.svg';
import searchIcon from '../../shared/assets/search-icon.svg';
import { sidebarContext } from '../context/sidebar/sidebarContext';
import { listContinents } from '../utils/listContinents';
import { countryContext } from '../context/country/countryContext';
import { useForms } from '../../hooks/useForms';
import { useNavigate } from 'react-router-dom';

export const SearchBox = () => {

  const [showFilter, setShowFilter] = useState(false);

  const {onInputChange, search, onReset} = useForms({initialForm: {
    search: ''
  }});

  const navigate = useNavigate();

  const refInput = useRef(null);

  const {handleSidebar} = useContext(sidebarContext);

  const {handleContinet} = useContext(countryContext);

  const continents = listContinents()

  const showContinents = () => {
    setShowFilter(!showFilter);
  }

  const handleClick = (e) => {
    if (refInput.current && !refInput.current.contains(e.target)) {
      setShowFilter(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`)
    onReset();
    setShowFilter(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [])
  

  return (
    <div className="fixed top-0 w-full lg:left-[16rem] lg:w-[calc(100%-16rem)] bg-white z-40">
      <div className="mx-auto container px-[15px] py-[15px]">
        <div className='flex justify-between items-center lg:justify-center'>
          <img src={menuHambuger} alt="menu-hamburger" width={50} className='lg:hidden' onClick={handleSidebar} />
          <div className='relative w-[80%]' ref={refInput}>
            <form onSubmit={handleSubmit}>
              <input 
                name='search'
                type="text" 
                className="w-full p-2 text-green-dark placeholder-green-dark rounded-lg border-2 border-[#000] focus:border-green-dark"
                onClick={showContinents}
                onChange={onInputChange}
                value={search}
              />
              <button className='hidden' type='submit'></button>
            </form>
            <img src={searchIcon} alt="search-icon" className='absolute top-2 right-2' width={25} />
            {
              showFilter && (
              <div className='absolute bottom-[-1] cursor-pointer w-full bg-white p-2 flex gap-2'>
                {
                  continents.map((continent) => (
                    <div key={continent.code} className='hover:bg-gray-300 flex flex-col items-center' onClick={() => handleContinet(continent.code)}>
                      <p className='p-2'>{continent.name}</p>
                      <img src={continent.url} width={60} alt="" />
                    </div>
                  ))
                }
              </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
