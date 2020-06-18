function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({coords}) => {
        console.log(coords.longitude, coords.latitude)
    })}
}
getLocation()
