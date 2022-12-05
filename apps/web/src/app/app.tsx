import { Route, Routes } from 'react-router-dom'
import { Auth } from './components/auth'
import { Home } from './components/home'

export function App() {

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home/>} />
      </Route>
      <Route path={"/auth"} element={<Auth/>}/>
    </Routes>
  );
}

export default App;
