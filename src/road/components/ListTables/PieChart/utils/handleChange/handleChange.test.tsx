import { handleChange } from '.'

describe('handleChange function', () => {
  it('updates state correctly when value is 0', () => {
    const type = 'semaphore'
    const value = 0
    const setState = jest.fn()
    const state = {}

    handleChange(type, value, setState, state)

    expect(setState).toHaveBeenCalledWith({
      [type]: 'VERDE'
    })
  })

  it('updates state correctly when value is 1', () => {
    const type = 'semaphore'
    const value = 1
    const setState = jest.fn()
    const state = {}

    handleChange(type, value, setState, state)

    expect(setState).toHaveBeenCalledWith({
      [type]: 'AMARELO'
    })
  })

  it('updates state correctly when value is not 0 or 1', () => {
    const type = 'semaphore'
    const value = 2
    const setState = jest.fn()
    const state = {}

    handleChange(type, value, setState, state)

    expect(setState).toHaveBeenCalledWith({
      [type]: 'VERMELHO'
    })
  })
})
