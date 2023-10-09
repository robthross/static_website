import { filteredOptions } from '.'
import { IEnterpriseData } from '../../../../interfaces/components/enterprises'

const mockSetFilteredList = jest.fn()

const mockInitialEnterprises: IEnterpriseData = {
  enterprises: [
    { id: '1', name: 'Enterprise 1' },
    { id: '2', name: 'Enterprise 2' },
    { id: '3', name: 'Another Enterprise' }
  ]
} as IEnterpriseData

describe('filteredOptions', () => {
  beforeEach(() => {
    mockSetFilteredList.mockClear()
  })

  it('should filter by ID', () => {
    filteredOptions(mockInitialEnterprises, '1', mockSetFilteredList)

    expect(mockSetFilteredList).toHaveBeenCalledWith([
      { id: '1', name: 'Enterprise 1' }
    ])
  })

  it('should filter by Name', () => {
    filteredOptions(mockInitialEnterprises, 'Enterprise', mockSetFilteredList)

    expect(mockSetFilteredList).toHaveBeenCalledWith([
      { id: '1', name: 'Enterprise 1' },
      { id: '2', name: 'Enterprise 2' },
      { id: '3', name: 'Another Enterprise' }
    ])
  })

  it('should handle case-insensitive filtering', () => {
    filteredOptions(mockInitialEnterprises, 'enterprise 1', mockSetFilteredList)

    expect(mockSetFilteredList).toHaveBeenCalledWith([
      { id: '1', name: 'Enterprise 1' }
    ])
  })

  it('should handle empty name', () => {
    filteredOptions(mockInitialEnterprises, '', mockSetFilteredList)

    expect(mockSetFilteredList).toHaveBeenCalledWith(
      mockInitialEnterprises.enterprises
    )
  })

  it('should handle null or undefined initialEnterprises', () => {
    filteredOptions(null, 'Enterprise', mockSetFilteredList)
    filteredOptions(undefined, 'Enterprise', mockSetFilteredList)

    expect(mockSetFilteredList).toHaveBeenCalledWith([])
  })
})
