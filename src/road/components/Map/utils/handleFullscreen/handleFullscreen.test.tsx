import { handleFullscreen } from '.'

describe('handleFullscreen Function', () => {
  it('should request fullscreen on map element', () => {
    const mapElement = document.createElement('div')
    mapElement.classList.add('leaflet-container')
    document.body.appendChild(mapElement)

    const requestFullscreenMock = jest.fn()
    mapElement.requestFullscreen = requestFullscreenMock

    handleFullscreen()
    expect(requestFullscreenMock).toHaveBeenCalled()
  })

  it('should do nothing if map element is not found', () => {
    const originalQuerySelector = document.querySelector
    document.querySelector = jest.fn()

    handleFullscreen()

    expect(document.querySelector).toHaveBeenCalledWith('.leaflet-container')
    expect(document.querySelector).toHaveBeenCalledTimes(1)

    document.querySelector = originalQuerySelector
  })

  it('should do nothing if requestFullscreen is not available', () => {
    const originalRequestFullscreen = HTMLElement.prototype.requestFullscreen
    HTMLElement.prototype.requestFullscreen = undefined

    const mapElement = document.createElement('div')
    mapElement.classList.add('leaflet-container')
    document.body.appendChild(mapElement)

    handleFullscreen()

    HTMLElement.prototype.requestFullscreen = originalRequestFullscreen
  })
})
