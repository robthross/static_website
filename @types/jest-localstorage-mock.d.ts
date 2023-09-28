declare module 'jest-localstorage-mock' {
  const mockLocalStorage: {
    getItem: jest.Mock<any, any>
    setItem: jest.Mock<any, any>
    removeItem: jest.Mock<any, any>
    clear: jest.Mock<any, any>
  }

  export default mockLocalStorage
}
