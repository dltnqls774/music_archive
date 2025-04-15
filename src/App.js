import { Outlet } from "react-router-dom";
import Navbar from './component/Navbar';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";

const queryClient = new QueryClient();
function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
      </QueryClientProvider>
      
    </AuthContextProvider>
  );
}

export default App;
