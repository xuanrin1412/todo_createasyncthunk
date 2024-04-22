import React from 'react';
import { Provider } from 'react-redux';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-[70%] lg:max-w-[35%]">
          <PersistGate loading={null} persistor={persistor}>
            <TodoForm />
            <TodoList />
          </PersistGate>
        </div>
      </div>
    </Provider>
  );
};

export default App;
