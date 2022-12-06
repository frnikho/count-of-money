import { Route, Routes } from 'react-router-dom'
import { Auth } from './components/auth'
import { Home } from './pages/home/Home'
import { Profile } from './components/profile';
import { Article } from './components/article';
import {MainLayout} from "./layout/MainLayout";
import './app.module.scss';

export function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} />
        <Route path={"admin"} element={<h1>abc</h1>}/>
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/article" element={<Article title='title' body='body' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' date='date' author='author' link='https://www.google.com/' />} />
      <Route path={"/auth"} element={<Auth/>}/>
    </Routes>
  );
}

export default App;
