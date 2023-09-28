import React from 'react'
import { Control, FieldValues, useController } from 'react-hook-form'

import theme from '../../styles/theme'
import Text from '../Text'
import { FormInput, FormInputLabel, FormItemContainer } from './styles'

interface InputProps<T> {
  name: string
  control: Control<FieldValues>
  rules?: Partial<Record<string, T>>
  placeholder?: string
  label?: string
  date?: boolean
  disabled?: boolean
  type?: string
  style?: React.CSSProperties
  notRequired?: boolean
}

const Input = <T,>({
  name,
  control,
  rules,
  placeholder,
  style,
  type,
  date,
  label,
  disabled,
  notRequired = false,
  ...props
}: InputProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController<FieldValues, string>({ control, name, rules })

  const renderError = () =>
    error && error.message ? (
      <Text
        style={{
          color: error?.message ? '#F5365C' : '#000000'
        }}
      >
        {error?.message}
      </Text>
    ) : null

  const handleDateInput = (inputValue: string) => {
    const numericValue = inputValue.replace(/\D/g, '')

    if (numericValue.length <= 2) {
      onChange(numericValue)
    } else if (numericValue.length <= 4) {
      onChange(numericValue.slice(0, 2) + '/' + numericValue.slice(2))
    } else {
      onChange(
        numericValue.slice(0, 2) +
          '/' +
          numericValue.slice(2, 4) +
          '/' +
          numericValue.slice(4, 8)
      )
    }
  }

  return (
    <FormItemContainer>
      <FormInputLabel>
        <Text
          color={theme.colors.blueWarmVivid.blueWarmVivid80}
          size="14px"
          weight={600}
          style={{ marginBottom: 9 }}
        >
          {label || placeholder}{' '}
          {!notRequired && (
            <strong style={{ color: theme.colors.red.danger }}>*</strong>
          )}
        </Text>
      </FormInputLabel>
      <FormInput
        {...props}
        value={value}
        placeholder={placeholder}
        style={style}
        disabled={disabled}
        type={type}
        onChange={(event) => {
          const inputValue = event.target.value
          if (date) handleDateInput(inputValue)
          else onChange(inputValue)
        }}
      />
      {renderError()}
    </FormItemContainer>
  )
}

export default Input
