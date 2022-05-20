import { filterValueReducer } from '../filterValueReducer'
import { setFilterValue } from '../../../actions/todos'

describe('test filter value reducer', () => {
  it('initial state', () => {
    expect(filterValueReducer(undefined, { type: '', payload: '' })).toEqual({
      filterValue: 'all'
    })
  })

  it('Set filter value action', () => {
    const previousState = { filterValue: '' }
    expect(
      filterValueReducer(previousState, setFilterValue('completed'))
    ).toEqual({
      filterValue: 'completed'
    })
  })
})
