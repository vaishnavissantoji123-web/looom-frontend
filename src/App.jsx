import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import Login from './pages/login';
import Register from './pages/register';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<Register/>}/>

        </Route>
        

      </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;