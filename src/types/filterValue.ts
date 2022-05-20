import { UnknownAction } from './generalTypes'

export enum FilterValueActionType {
  ACTION_SET_FILTER_VALUE = 'ACTION_SET_FILTER_VALUE'
}

export interface ISetFilterValueAction {
  type: FilterValueActionType.ACTION_SET_FILTER_VALUE
  payload: string
}

export interface ITodosFilterValueReducer {
  filterValue: string
}

export type TodosFilterValueAction = ISetFilterValueAction | UnknownAction
