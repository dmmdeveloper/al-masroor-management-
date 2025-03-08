import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createRoutesFromElements, Route, RouterProvider , createBrowserRouter, useNavigate, Navigate } from 'react-router-dom'
import Form from './components/form/Form.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  return isAuthenticated ? element : <Navigate to="/authenticate"  />;
};
const router = createBrowserRouter(
  createRoutesFromElements(<>
  <Route exact path="/" element={ <ProtectedRoute element={<App/>} />} />  
  <Route  path='/authenticate' element={<Form/>} />

  </>)
)

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router}/>
  </Provider>,
)
