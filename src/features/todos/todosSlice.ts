import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { persistReducer } from 'redux-persist';

export enum VisibilityFilter {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}

export interface Todo {
  // userId: number,
  id: number,
  title: string,
  completed: boolean
}

interface TodoState {
  todos: Todo[];
  filter: VisibilityFilter;
  filteredTodos: Todo[]; 
  loading: boolean,
  error: boolean
}

const initialState: TodoState = {
  todos: [],
  filter: VisibilityFilter.SHOW_ALL,
  filteredTodos: [],
  loading: false,
  error: false,
};

export const getTodos = createAsyncThunk<Todo[]>(
  'todos/getTodos',
  async () => {
    const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
    const todos = response.data;
    return todos.slice(0, 5);
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        // userId: Date.now(),
        id: Date.now(),
        title: action.payload,
        completed: false
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
        const todoIndex = state.todos.findIndex(todo => todo.id === action.payload);
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed ;
     
      return state;
    },
    setFilter: (state, action: PayloadAction<VisibilityFilter>) => {
      state.filter = action.payload;
      switch (action.payload) {
        case VisibilityFilter.SHOW_ACTIVE:
          state.filteredTodos = state.todos.filter(todo => !todo.completed);
          break;
        case VisibilityFilter.SHOW_COMPLETED:
          state.filteredTodos = state.todos.filter(todo => todo.completed);
          break;
        default:
          state.filteredTodos = state.todos;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTodos.fulfilled, (state,action) => {

        console.log('action.payload', action.payload )

        state.todos = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getTodos.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
})
export const { addTodo,toggleTodo,setFilter} = todoSlice.actions;
export default todoSlice.reducer
