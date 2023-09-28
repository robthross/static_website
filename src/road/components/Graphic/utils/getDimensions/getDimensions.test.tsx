import { getDimensions } from '.'

describe('getDimensions', () => {
  it('should set width and height for PDF mode', () => {
    const setWidthMock = jest.fn()
    const setHeightMock = jest.fn()
    const pdf = true
    getDimensions(pdf, setWidthMock, setHeightMock)

    expect(setWidthMock).toHaveBeenCalledWith(595)
    expect(setHeightMock).toHaveBeenCalledWith(396.6666666666667)
  })

  it('should set width and height based on window width for non-PDF mode', () => {
    const setWidthMock = jest.fn()
    const setHeightMock = jest.fn()
    const pdf = false
    getDimensions(pdf, setWidthMock, setHeightMock)

    expect(setWidthMock).toHaveBeenCalledWith(716.8)
    expect(setHeightMock).toHaveBeenCalledWith(477.8666666666666)
  })

  let mockSetWidth: jest.Mock
  let mockSetHeight: jest.Mock

  beforeEach(() => {
    mockSetWidth = jest.fn()
    mockSetHeight = jest.fn()
  })

  it('should set width and height based on windowWidth if windowWidth is less than or equal to 929', () => {
    const mockWindowWidth = 800
    global.innerWidth = mockWindowWidth

    getDimensions(false, mockSetWidth, mockSetHeight)

    expect(mockSetWidth).toHaveBeenCalledWith(mockWindowWidth)
    expect(mockSetHeight).toHaveBeenCalledWith(mockWindowWidth)
  })

  it('should set width and height as specified values if windowWidth is greater than 929', () => {
    const mockWindowWidth = 1000
    global.innerWidth = mockWindowWidth

    getDimensions(false, mockSetWidth, mockSetHeight)

    const expectedWidth = (mockWindowWidth * 70) / 100
    const expectedHeight = (expectedWidth / 3) * 2

    expect(mockSetWidth).toHaveBeenCalledWith(expectedWidth)
    expect(mockSetHeight).toHaveBeenCalledWith(expectedHeight)
  })
})
