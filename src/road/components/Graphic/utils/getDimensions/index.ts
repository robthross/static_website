export const getDimensions = (
  pdf?: boolean,
  setWidth?: React.Dispatch<React.SetStateAction<number>>,
  setHeight?: React.Dispatch<React.SetStateAction<number>>
) => {
  const windowWidth = window.innerWidth
  if (pdf) {
    const w = 595
    const h = (w / 3) * 2
    setWidth(w)
    setHeight(h)
  } else {
    const w = (windowWidth * 70) / 100
    const h = (w / 3) * 2
    windowWidth > 929 ? setWidth(w) : setWidth(windowWidth)
    windowWidth > 929 ? setHeight(h) : setHeight(windowWidth)
  }
}
