import { RootState } from '../reducers/rootReducer'

export const todosSelector = (state: RootState) => state.todos
export const userSelector = (state: RootState) => state.user
