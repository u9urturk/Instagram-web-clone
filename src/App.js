import './App.css';
import { useRoutes } from "react-router-dom";
import routes from './routes';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loader from './components/Loader'
import { useEffect, useState } from 'react';

function App() {

  const user = useSelector(state => state.auth.user)
  const showRoutes = useRoutes(routes)
  const [redirect , setRedirect] = useState(false)
  
  useEffect(()=>{
    let timeOut = setTimeout(()=>{
      setRedirect(true)
    },2000)
    return () => {
      clearTimeout(timeOut)
    }
  },[])

  if(!user && !redirect){
    return <Loader></Loader>
  }

  return (
    <>  
      <Toaster position='top-right'></Toaster>
      {showRoutes}
    </>
  )
}

export default App;
