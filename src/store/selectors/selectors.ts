import { RootState } from '../reducers/rootReducer'

export const todosSelector = (state: RootState) => state.todos.todosData
export const filterValueSelector = (state: RootState) => state.todos.filterValue
export const userSelector = (state: RootState) => state.user.userData
export const notificationSelector = (state: RootState) =>
  state.user.notifications
export const websocketSelector = (state: RootState) => state.user.websocket
