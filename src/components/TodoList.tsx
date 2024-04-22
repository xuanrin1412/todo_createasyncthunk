import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '../store';
import { FaRegCheckCircle, FaCheckCircle } from 'react-icons/fa';
import { Todo, VisibilityFilter, getTodos, setFilter, toggleTodo } from '../features/todos/todosSlice';

const TodoList: React.FC = () => {
    const todos: Todo[] = useSelector((state: RootState) => state.todos);
    const filteredTodos: Todo[] = useSelector((state: RootState) => state.filteredTodos);
    const filter: VisibilityFilter = useSelector((state: RootState) => state.filter);
    const dispatch = useAppDispatch<AppDispatch>();

    useEffect(() => {
        if(!todos.length){    
            dispatch(getTodos())
        }
      
    }, []);

    const handleToggle = (id: number) => {
        dispatch(toggleTodo(id));
    };

    console.log('state.filter',filter);


    return (
        <div>
            {/* {isDataLoaded && ( */}
            <>
                <div className="my-2 bg-white rounded-md drop-shadow-lg py-1">
                    <ul>
                        {filter === VisibilityFilter.SHOW_ALL ? todos.map((todo: Todo, index: number) => (
                            <li
                                className={`p-3 border-b flex items-center ${index === todos.length - 1 ? 'border-none' : ''}`}
                                key={todo.id}
                                onClick={() => handleToggle(todo.id)}
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'gray' : 'initial' }}
                            >
                                <div className="flex items-center space-x-4">
                                    <span> {todo.completed ? <FaCheckCircle style={{ fontSize: 20, color: "green" }} /> : <FaRegCheckCircle style={{ fontSize: 20 }} />}</span>
                                    <span>{todo.title}</span>
                                </div>
                            </li>
                        )) :  filteredTodos.map((todo: Todo, index: number) => (
                            <li
                                className={`p-3 border-b flex items-center ${index === todos.length - 1 ? 'border-none' : ''}`}
                                key={todo.id}
                                onClick={() => handleToggle(todo.id)}
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'gray' : 'initial' }}
                            >
                                <div className="flex items-center space-x-4">
                                    <span> {todo.completed ? <FaCheckCircle style={{ fontSize: 20, color: "green" }} /> : <FaRegCheckCircle style={{ fontSize: 20 }} />}</span>
                                    <span>{todo.title}</span>
                                </div>
                            </li>
                        ))}

                        {todos.length == 0 && filter === VisibilityFilter.SHOW_ACTIVE && <div className='p-3'>You have finish all task</div>}
                        {todos.length == 0 && filter === VisibilityFilter.SHOW_COMPLETED && <div className='p-3'>You haven't finish any task</div>}

                    </ul>
                </div>
                <div className="flex bg-white p-2 drop-shadow-lg items-center rounded-md">
                    <div className="w-2/6">
                        {filter === VisibilityFilter.SHOW_ALL && <span>{todos.length} items left</span>}
                        {filter === VisibilityFilter.SHOW_ACTIVE && <span>{filteredTodos.length} items left</span>}
                        {filter === VisibilityFilter.SHOW_COMPLETED && <span>{filteredTodos.length} items complete</span>}

                    </div>
                    <div className="flex space-x-4">
                        <span className={`py-[3px] px-2 rounded-md ${filter === VisibilityFilter.SHOW_ALL ? ' border border-red-500' : ''}`} onClick={() => dispatch(setFilter(VisibilityFilter.SHOW_ALL))}>All</span>
                        <span className={`py-[3px] px-2 rounded-md ${filter === VisibilityFilter.SHOW_ACTIVE ? 'border border-red-500' : ''}`} onClick={() => dispatch(setFilter(VisibilityFilter.SHOW_ACTIVE))}>Active</span>
                        <span className={`py-[3px] px-2 rounded-md ${filter === VisibilityFilter.SHOW_COMPLETED ? 'border border-red-500' : ''}`} onClick={() => dispatch(setFilter(VisibilityFilter.SHOW_COMPLETED))}>Complete</span>
                    </div>
                </div></>
            {/* )} */}
        </div>
    );
};

export default TodoList;
