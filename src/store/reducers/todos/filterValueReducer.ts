import {
  ISetFilterValueAction,
  FilterValueActionType,
  ITodosFilterValueReducer
} from '../../../types/filterValue'

const intialFilterValueState: ITodosFilterValueReducer = {
  filterValue: 'all'
}

export const filterValueReducer = (
  state = intialFilterValueState,
  action: ISetFilterValueAction
) => {
  switch (action.type) {
    case FilterValueActionType.ACTION_SET_FILTER_VALUE:
      return {
        filterValue: action.payload
      }
    default:
      return state
  }
}
