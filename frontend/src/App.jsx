import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MainLayout() {
  return (
    <div>
      <div>
        navbar
        <Link to="/">HOME</Link>
        <Link to="/board/add">글쓰기</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

function BoardList() {
  return (
    <div>
      <h3>글 목록</h3>
    </div>
  );
}

function BoardAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const navigate = useNavigate();

  function handleSaveButtonClick() {
    axios
      .post("/api/board/add", {
        title: title,
        content: content,
        author: author,
      })
      .then((res) => {
        const message = res.data.message;
        if (message) {
          // toast 띄우기
          toast(message.text, { type: message.type });
        }
        // "/"로 이동
        navigate("/");
      })
      .catch((err) => {
        console.log("잘 안되면 실행되는 코드");
      })
      .finally(() => {
        console.log("항상 실행되는 코드");
      });
  }

  return (
    <div>
      <h3>글 작성</h3>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          id=""
          cols="30"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSaveButtonClick}>저장</button>
      </div>
    </div>
  );
}

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
