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

  const {handleContinet, codeContinent} = useContext(countryContext);

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

  const selectContinent = (code) => {
    handleContinet(code);
    setShowFilter(false);
    navigate('/');
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [])
  
  return (
    <div className="fixed top-0 w-full lg:left-[18rem] lg:w-[calc(100%-18rem)] z-40 bg-white shadow-lg">
      <div className="mx-auto container px-[15px] py-[15px]">
        <div className='flex justify-between items-center lg:justify-center'>
          <img src={menuHambuger} alt="menu-hamburger" width={50} className='lg:hidden' onClick={handleSidebar} />
          <div className='relative w-[80%]' ref={refInput}>
            <form onSubmit={handleSubmit}>
              <input 
                name='search'
                type="text" 
                className="w-full py-2 px-4 text-green-dark placeholder-green-dark rounded-lg border-2 border-[#929292] focus:border-[#929292] bg-transparent relative z-10 focus-visible:border-[#929292]"
                placeholder='Country name'
                onClick={showContinents}
                onChange={onInputChange}
                autoComplete='off'
                value={search}
              />
              <button className='hidden' type='submit'></button>
            </form>
            <img src={searchIcon} alt="search-icon" className='absolute top-2 right-2' width={25} />
            {
              showFilter && (
              <div className='absolute z-[11] top-[85%] cursor-pointer w-full bg-white p-2 border-2 border-x-[#929292] border-b-[#929292] border-t-transparent border-t-0'>
                <h3 className='p-2'>Filter by continent</h3>
                <div className='grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-7'>
                {
                  continents.map((continent) => (
                    <div key={continent.code} 
                    className={`rounded-lg hover:bg-gray-300 col-span-1 flex flex-col items-center ${continent.code === codeContinent ? "bg-blue-900 hover:bg-blue-900 text-white" : ""}`} 
                    onClick={() => selectContinent(continent.code)}>
                      <p className='p-2'>{continent.name}</p>
                      <img src={continent.url} width={60} alt="" />
                    </div>
                  ))
                }
                </div>
              </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
