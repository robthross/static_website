export const toggleScrollZoom = (
  ref: React.MutableRefObject<any>,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  state: boolean
) => {
  ref?.current?.scrollWheelZoom?.enabled()
    ? ref?.current?.scrollWheelZoom?.disable()
    : ref?.current?.scrollWheelZoom?.enable()
  setState(!state)
}
