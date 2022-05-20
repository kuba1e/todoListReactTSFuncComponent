import { filterValueReducer } from '../filterValueReducer'
import { setFilterValue } from '../../../actions/todos'

describe('test filter value reducer', () => {
  it('should return initial state', () => {
    expect(filterValueReducer(undefined, { type: '', payload: '' })).toEqual({
      filterValue: 'all'
    })
  })

  it('should handle filter setting ', () => {
    const previousState = { filterValue: '' }
    expect(
      filterValueReducer(previousState, setFilterValue('completed'))
    ).toEqual({
      filterValue: 'completed'
    })
  })
})
