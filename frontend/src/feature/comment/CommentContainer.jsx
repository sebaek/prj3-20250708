import { Button, FormControl } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { CommentAdd } from "./CommentAdd.jsx";
import { ComentList } from "./ComentList.jsx";

export function CommentContainer({ boardId }) {
  return (
    <div>
      <h3>댓글 창</h3>

      <CommentAdd boardId={boardId} />
      <ComentList />
    </div>
  );
}
