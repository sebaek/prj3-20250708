import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./MainLayout.jsx";
import { BoardAdd } from "./BoardAdd.jsx";
import { BoardList } from "./BoardList.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<BoardList />} />
          <Route path="board/add" element={<BoardAdd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
