export const handleFullscreen = () => {
  const mapElement = document.querySelector('.leaflet-container')
  if (mapElement && mapElement.requestFullscreen) {
    mapElement.requestFullscreen()
  }
}
