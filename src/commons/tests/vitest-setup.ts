import '@testing-library/jest-dom/vitest'

// antd requires a matchMedia polyfill in order to work properly
// https://github.com/ant-design/ant-design/issues/21096
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }
  }

Object.assign(global, {
  getComputedStyle: () => {
    return {
      getPropertyValue: () => {
        return ''
      },
    }
  },
})
