export const getImageByName = () => {

  const getFlagByName = async(name) => {
    try {
      const res = await fetch(`https://pixabay.com/api/?key=44216386-6326ad4c28ecda6f571d1ef2a&category=flag&image_type=vector&q=${name}+flag`);
      const data = await res.json();
      if(data.hits.length > 0) {
        const {webformatURL} = data.hits[0];
        return webformatURL;
      } else {
        return null;
      }
    }catch(error) {
      return null;
    }
  }

  const getImageCityByName = async(name) => {
    try {
      const res = await fetch(`https://pixabay.com/api/?key=44216386-6326ad4c28ecda6f571d1ef2a&category=country&orientation=horizontal&image_type=background&q=${name}`);
      const data = await res.json();
      if(data.hits.length > 0) {
        const {webformatURL} = data.hits[0];
        return webformatURL;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  const getCountryInfo = async(name) => {
    try {
      const flag = await getFlagByName(name);
      const city = await getImageCityByName(name);
      return {flag, city}
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getFlagByName,
    getImageCityByName,
    getCountryInfo
  }
}