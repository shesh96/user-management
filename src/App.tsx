import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UserList } from "./features/users/UserList";
import { UserForm } from "./features/users/UserForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserList />} />
          <Route path="create" element={<UserForm />} />
          <Route path="edit/:id" element={<UserForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
