/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { debounce } from 'lodash'

export const useDebounceFn = (fnToDebounce, delay = 1000) => {
  // Trả lỗi luôn nếu delay nhận vào không phải number
  if (isNaN(delay)) {
    throw new Error('Delay value should be a number.')
  }
  // Tương tự cũng trả lỗi luôn nếu fnToDebounce không phải là 1 function
  if (!fnToDebounce || (typeof fnToDebounce !== 'function')) {
    throw new Error('Debounce must have a function')
  }

  return useCallback(debounce(fnToDebounce, delay), [fnToDebounce, delay])
}
