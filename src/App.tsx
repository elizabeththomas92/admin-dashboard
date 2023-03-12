import React from "react";
import { Routes, Route } from "react-router-dom";

import Users from "./pages/users";
import CreateUser from "./pages/users/create";
import User from "./pages/users/[user_id]";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/create" element={<CreateUser />}></Route>
        <Route path="/users/:user_id" element={<User />}></Route>
      </Routes>
    </Provider>
  );
}

export default App;
