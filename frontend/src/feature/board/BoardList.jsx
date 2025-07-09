import { Table } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

export function BoardList() {
  useEffect(() => {
    // 마운트될때(initial render 시) 실행되는 코드
    axios
      .get("/api/board/list")
      .then((res) => {
        console.log("잘 될 때 코드");
      })
      .catch((err) => {
        console.log("잘 안될 때 코드");
      })
      .finally(() => {
        console.log("항상 실행 코드");
      });
  }, []);
  return (
    <div>
      <h3>글 목록</h3>
      <Table></Table>
    </div>
  );
}
