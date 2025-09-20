import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';


function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  
  function handleLoguear (user) {
  localStorage.setItem("adminUser", JSON.stringify(user));
  setUser(user);
  
  }

  if (!user) {
    return showRegister ? (
      <Register 
        onRegister={(u) => { 
          setUser(u); 
          setShowRegister(false); 
        }} 
        onShowLogin={() => setShowRegister(false)} 
      />
    ) : (
      <Login 
        onLogin={handleLoguear} 
        onShowRegister={() => setShowRegister(true)} 
      />
    );
  }

  return <Dashboard user={user} />;
}

export default App;
