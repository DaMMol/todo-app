import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import { UserProvider } from './context/UserContext';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <TodoProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </UserProvider>
        </TodoProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
