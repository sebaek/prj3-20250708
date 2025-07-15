import { Button, FormControl, Spinner } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function CommentAdd({ boardId }) {
  const [comment, setComment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  function handleCommentSaveClick() {
    setIsProcessing(true);
    axios
      .post("/api/comment", { boardId: boardId, comment: comment })
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        setComment("");
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  let saveButtonDisabled = false;
  if (comment.trim().length === 0) {
    saveButtonDisabled = true;
  }

  return (
    <div>
      <FormControl
        as="textarea"
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        disabled={isProcessing || saveButtonDisabled}
        onClick={handleCommentSaveClick}
      >
        {isProcessing && <Spinner size="sm" />}
        댓글 저장
      </Button>
      ;
    </div>
  );
}
