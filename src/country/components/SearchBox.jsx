import { useContext } from 'react';
import menuHambuger from '../../shared/assets/menu-hambuger.svg';
import searchIcon from '../../shared/assets/search-icon.svg';
import { sidebarContext } from '../../hooks/sidebarContext';

export const SearchBox = () => {
  const {handleSidebar} = useContext(sidebarContext);

  return (
    <div className="fixed top-0 left-0 lg:pl-48 w-full bg-white z-40">
      <div className="mx-auto container px-[15px] py-[15px]">
        <div className='flex justify-between items-center lg:justify-center'>
          <img src={menuHambuger} alt="menu-hamburger" width={50} className='lg:hidden' onClick={handleSidebar} />
          <div className='relative w-[80%]'>
            <input type="text" className="w-full p-2 text-green-dark placeholder-green-dark rounded-lg border-2 border-[#000] focus:border-green-dark" />
            <img src={searchIcon} alt="search-icon" className='absolute top-2 right-2' width={25} />
          </div>
        </div>
      </div>
    </div>
  )
}
