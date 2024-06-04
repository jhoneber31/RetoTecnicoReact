export const getImageByName = () => {

  const getFlagByName = async(name) => {
    try {
      const res = await fetch(`https://pixabay.com/api/?key=44216386-6326ad4c28ecda6f571d1ef2a&category=flag&image_type=photo&q=${name}-flag`);
      const data = await res.json();
      const {webformatURL} = data.hits[0];
      return webformatURL;
    }catch(error) {
      console.log(error)
    }
  }

  const getImageCityByName = async(name) => {
    try {
      const res = await fetch(`https://pixabay.com/api/?key=44216386-6326ad4c28ecda6f571d1ef2a&category=country&orientation=horizontal&image_type=background&q=${name}`);
      const data = await res.json();
      const {webformatURL} = data.hits[0];
      return webformatURL;
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getFlagByName,
    getImageCityByName
  }
}