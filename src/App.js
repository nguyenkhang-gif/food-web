import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Footer from './component/Footer';
import NavBar from './component/NavBar';
import Login from './pages/Login';
import Home from './pages/Home';
import FooditemPage from './pages/FooditemPage';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Userprofile from './pages/userprofile';
// import Checkout from './pages/Checkout';


const Layout = ()=>{
  return(
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/fooditem/:id',
        element:<FooditemPage/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/shopcart',
        element:<Cart/>
      },
      {
        path:'/userprofile',
        element:<Userprofile/>
      }
    ]
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}





export default App;
