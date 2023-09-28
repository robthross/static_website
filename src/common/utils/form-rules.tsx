import moment from 'moment'

export const valueIsRequired = (
  required = true,
  message = 'Campo obrigatório.'
): { required: { value: boolean; message: string } } => {
  return {
    required: { value: required, message }
  }
}

export const emailMatch = {
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: 'Insira um endereço de e-mail válido.'
  }
}
export const dateIsValid = (
  message = 'Data inválida.',
  minDate?: string, // Data mínima no formato 'dd/mm/yyyy'
  maxDate?: string // Data máxima no formato 'dd/mm/yyyy'
): { validate: (value: string) => string | undefined } => {
  return {
    validate: (value: string) => {
      const date = moment(value, 'DD/MM/YYYY', true)

      if (!date.isValid()) {
        return message
      }

      if (
        minDate &&
        moment(value, 'DD/MM/YYYY').isBefore(moment(minDate, 'DD/MM/YYYY'))
      ) {
        return `A data deve ser igual ou posterior a ${minDate}`
      }

      if (
        maxDate &&
        moment(value, 'DD/MM/YYYY').isAfter(moment(maxDate, 'DD/MM/YYYY'))
      ) {
        return `A data deve ser igual ou anterior a ${maxDate}`
      }

      return undefined
    }
  }
}

export const maxValue = (
  value = 1,
  message = `Tamanho máximo ${value}.`
): { maxLength: { value: number; message: string } } => {
  return {
    maxLength: {
      value,
      message
    }
  }
}

export const minValue = (
  value = 1,
  message = `Tamanho mínimo ${value}.`
): { minLength: { value: number; message: string } } => {
  return {
    minLength: {
      value,
      message
    }
  }
}

export const nameIsValid = (
  message = 'Nome inválido.'
): { validate: (value: string) => string | undefined } => {
  return {
    validate: (value: string) => {
      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/

      if (!regex.test(value)) {
        return message
      }

      return undefined
    }
  }
}
