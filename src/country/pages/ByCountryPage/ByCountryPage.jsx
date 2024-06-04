import picture from '../../../shared/assets/picture.jpg';
import flagPeru from '../../../shared/assets/flag_Peru.png';

export const ByCountryPage = () => {
  return (
    <section>
      <div className="mx-auto container px-[15px]">
        <div className="grid grid-cols-1 gap-3 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center">
          <div className="col-span-1 w-full mx-auto">
            <div className='max-w-72 rounded-lg border-2 mx-auto cursor-pointer'>
              <img src={picture} alt="picture" className='rounded-t-lg'/>
              <div className='p-2 flex items-center'>
                <img src={flagPeru} alt="flag" className="w-[40px] h-[30px] object-cover" />
                <div className='flex flex-col ml-3'>
                  <span className='font-bold text-[18px]'>Perú</span>
                  <span>América</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 w-full mx-auto">
            <div className='max-w-72 rounded-lg border-2 mx-auto'>
              <img src={picture} alt="picture" className='rounded-t-lg'/>
              <div className='p-2 flex items-center'>
                <img src={flagPeru} alt="flag" className="w-[40px] h-[30px] object-cover" />
                <div className='flex flex-col ml-3'>
                  <span className='font-bold text-[18px]'>Perú</span>
                  <span>América</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
