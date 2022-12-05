import { Route, Routes } from 'react-router-dom'
import { Auth } from './components/auth'
import { Home } from './components/home'
import { Profile } from './components/profile';
import { Article } from './components/article';

export function App() {

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home/>} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/article" element={<Article title='title' body='body' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' date='date' author='author' link='https://www.google.com/' />} />
      <Route path={"/auth"} element={<Auth/>}/>
    </Routes>
  );
}

export default App;
