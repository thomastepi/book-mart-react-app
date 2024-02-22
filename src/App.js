import { Landing, Error, Register, ProtectedRoute } from "./pages";
import {
  SharedLayout,
  AddBook,
  AllBooks,
  Stats,
  Profile,
} from "./pages/dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route index element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        position="top-center"
      />
    </Router>
  );
}

export default App;
