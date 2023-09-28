import { getFormattedDateTime } from '../../utils/getFormattedDateTime'

describe('getFormattedDateTime', () => {
  test('deve retornar uma string no formato correto', () => {
    const fixedDate = new Date('2023-07-26T12:34:00')
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => fixedDate as unknown as string)

    const result = getFormattedDateTime()

    expect(result).toBe('26/07/2023 12:34')

    global.Date = Date
  })
})
