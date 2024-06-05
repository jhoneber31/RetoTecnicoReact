import iconSad from '../../shared/assets/icon-sad.svg';


export const CountryNotFound = () => {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center">
      <img src={iconSad} alt="icon-sad" width={100} />
      <h3 className='text-xl font-bold'>No se encontraron resultados.</h3>
    </div>
  )
}
