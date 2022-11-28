// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Auth } from './components/auth'
import { Home } from './components/home'
import { Settings } from './components/settings'
import { Profile } from './components/profile'

export function App() {

  return (
    <Router>
      <div>
        <h1>Hello</h1>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
