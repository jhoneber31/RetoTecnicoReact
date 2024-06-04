import { useContext, useRef, useState } from 'react';
import menuHambuger from '../../shared/assets/menu-hambuger.svg';
import searchIcon from '../../shared/assets/search-icon.svg';
import { sidebarContext } from '../context/sidebar/sidebarContext';
import { listContinents } from '../utils/listContinents';

export const SearchBox = () => {

  const [showFilter, setShowFilter] = useState(false)

  const refInput = useRef(null);

  const {handleSidebar} = useContext(sidebarContext);

  const continents = listContinents()

  const showContinents = () => {
    setShowFilter(!showFilter);
  }


  return (
    <div className="fixed top-0 left-0 lg:pl-48 w-full bg-white z-40">
      <div className="mx-auto container px-[15px] py-[15px]">
        <div className='flex justify-between items-center lg:justify-center'>
          <img src={menuHambuger} alt="menu-hamburger" width={50} className='lg:hidden' onClick={handleSidebar} />
          <div className='relative w-[80%]'>
            <input 
              type="text" 
              className="w-full p-2 text-green-dark placeholder-green-dark rounded-lg border-2 border-[#000] focus:border-green-dark"
              onClick={showContinents}
              ref={refInput}
            />
            <img src={searchIcon} alt="search-icon" className='absolute top-2 right-2' width={25} />
            {
              showFilter && (
              <div className='absolute bottom-[-1] cursor-pointer w-full bg-white p-2 flex gap-2'>
                {
                  continents.map((continent) => (
                    <div key={continent.code} className='hover:bg-gray-300 flex flex-col items-center'>
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
