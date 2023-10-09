import React, { useEffect, useState } from 'react'

import { ICheckbox } from '../../interfaces/components/checkbox'
import { StyledCheckBox } from './styles'

function CheckBox({ value, option, type }: ICheckbox) {
  const [checked, setChecked] = useState<boolean>(false)
  useEffect(() => {
    if (type === 'id') {
      setChecked(value?.split(',').includes(option))
    } else {
      setChecked(value === option)
    }
  }, [option, type, value])

  return (
    <StyledCheckBox>
      <input
        type="radio"
        value=""
        checked={checked}
        data-testid="input-radio"
        readOnly
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="3.5"
          stroke="#c5c5c5"
        />
        <path
          d="M9.40625 17.75C9.71875 18.0625 10.25 18.0625 10.5625 17.75L19.75 8.5625C20.0625 8.25 20.0625 7.71875 19.75 7.40625L18.625 6.28125C18.3125 5.96875 17.8125 5.96875 17.5 6.28125L10 13.7812L6.46875 10.2812C6.15625 9.96875 5.65625 9.96875 5.34375 10.2812L4.21875 11.4062C3.90625 11.7188 3.90625 12.25 4.21875 12.5625L9.40625 17.75Z"
          fill={checked ? '#2670E8' : '#fff'}
        />
      </svg>
    </StyledCheckBox>
  )
}

export default CheckBox
