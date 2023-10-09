import removeElementList from '../../utils/removeElementList'

describe('removeElementList', () => {
  it('remove o elemento de uma lista quando encontrado', () => {
    const list = [1, 2, 3, 4, 5]
    const element = 3
    const result = removeElementList(list, element)
    expect(result).toEqual([1, 2, 4, 5])
  })

  it('retorna a mesma lista quando o elemento não é encontrado', () => {
    const list = [1, 2, 3, 4, 5]
    const element = 6 // elemento que não está na lista
    const result = removeElementList(list, element)
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('remove um elemento de uma lista vazia', () => {
    const list: number[] = []
    const element = 2 // elemento que não está na lista vazia
    const result = removeElementList(list, element)
    expect(result).toEqual([])
  })
})
