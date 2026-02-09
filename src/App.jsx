import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/home';
import AppLayout from './layouts/app-layout';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<Home/>}/>

        </Route>
        

      </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;