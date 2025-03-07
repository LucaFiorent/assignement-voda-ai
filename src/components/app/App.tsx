import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../../react-query/queryClient";
import PrivateRoutes from "../../services/PrivateRoutes";
import LoginForm from "../Auth/LoginForm";
import AuthContextProvider from "../../services/AuthProvider";
import HomeContainer from "../Home/HomeContainer";
import MyPosts from "../MyPosts/MyPosts";
import RegisterForm from "../Auth/RegisterForm";
import ToastContainer from "../common/Toast/ToastContainer";
import AuthRoutes from "../../services/AuthRoute";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/MyPosts" element={<MyPosts />} />
            </Route>
            <Route element={<AuthRoutes />}>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Route>
          </Routes>
        </AuthContextProvider>
        <ToastContainer />
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
