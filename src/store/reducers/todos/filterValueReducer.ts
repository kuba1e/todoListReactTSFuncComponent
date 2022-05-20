import {
  FilterValueActionType,
  ITodosFilterValueReducer,
  TodosFilterValueAction
} from '../../../types/filterValue'

const intialFilterValueState: ITodosFilterValueReducer = {
  filterValue: 'all'
}

export const filterValueReducer = (
  state = intialFilterValueState,
  action: TodosFilterValueAction
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
