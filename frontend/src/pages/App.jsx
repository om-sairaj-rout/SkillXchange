import { useSelector } from "react-redux";
import Home from "./Home";
import Profile from "./Profile";


function App() {
  
  const { isAuthenticated } = useSelector((state) => state.checkAuth);
  return (
    <>
      {isAuthenticated ? <Profile /> : <Home />}
    </>
  );
}

export default App;
 