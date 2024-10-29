import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import App from './App';
import { 
    createBrowserRouter,
    createRoutesFromElements,
    Route
    } from 'react-router-dom';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Route>
    )
);

export default router;
