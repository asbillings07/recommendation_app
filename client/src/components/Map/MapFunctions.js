export const getUserPosition = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const userPostion = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      return userPostion;
    });
  } else {
    console.log('geolocation is not avaiable');
  }
};
