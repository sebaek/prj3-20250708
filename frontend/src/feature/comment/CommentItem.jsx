import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Spinner,
} from "react-bootstrap";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [nextComment, setNextComment] = useState(comment.comment);

  const { hasAccess } = useContext(AuthenticationContext);

  function handleDeleteButtonClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/${comment.id}`)
      .then(() => {
        toast("댓글이 삭제 되었습니다.", { type: "success" });
      })
      .catch(() => {
        toast("댓글 삭제 중 문제가 발생하였습니다.", { type: "error" });
      })
      .finally(() => {
        setIsProcessing(false);
        setDeleteModalShow(false);
      });
  }

  function handleUpdateButtonClick() {
    setIsProcessing(true);
    axios
      .put(`/api/comment`, {
        id: comment.id,
        comment: nextComment,
      })
      .then(() => {
        toast.success("댓글이 수정되었습니다.");
      })
      .catch(() => {
        toast.error("댓글 수정 중 문제가 발생하였습니다.");
      })
      .finally(() => {
        setIsProcessing(false);
        setEditModalShow(false);
      });
  }

  return (
    <>
      <div className="position-relative">
        <Card className="my-3">
          <CardHeader className="d-flex justify-content-between">
            <div style={{ fontWeight: "bold" }}>{comment.authorNickName}</div>
            <small>{comment.timesAgo}</small>
          </CardHeader>
          <CardBody>
            <div style={{ whiteSpace: "pre" }}>{comment.comment}</div>
          </CardBody>
        </Card>

        {hasAccess(comment.authorEmail) && (
          <div className="position-absolute end-0 bottom-0 m-3">
            <Button
              size="sm"
              variant="outline-danger"
              disabled={isProcessing}
              onClick={() => setDeleteModalShow(true)}
              className="me-2"
            >
              {isProcessing && <Spinner size="sm" />}
              삭제
            </Button>
            <Button
              size="sm"
              variant="outline-primary"
              disabled={isProcessing}
              onClick={() => setEditModalShow(true)}
            >
              {isProcessing && <Spinner size="sm" />}
              수정
            </Button>
          </div>
        )}
      </div>

      {hasAccess(comment.authorEmail) && (
        <>
          {/*  댓글 삭제 모달  */}
          <Modal
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>댓글 삭제 확인</Modal.Title>
            </Modal.Header>
            <Modal.Body>댓글을 삭제하시겠습니까?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-dark"
                onClick={() => setDeleteModalShow(false)}
              >
                취소
              </Button>
              <Button
                disabled={isProcessing}
                variant="danger"
                onClick={handleDeleteButtonClick}
              >
                {isProcessing && <Spinner size="sm" />}
                삭제
              </Button>
            </Modal.Footer>
          </Modal>

          {/*  댓글 수정 모달  */}
          <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>댓글 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup controlId={"commentTextarea" + comment.id}>
                <FormLabel>수정 할 댓글</FormLabel>
                <FormControl
                  as="textarea"
                  rows={5}
                  value={nextComment}
                  onChange={(e) => setNextComment(e.target.value)}
                />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-dark"
                onClick={() => {
                  setNextComment(comment.comment);
                  setEditModalShow(false);
                }}
              >
                취소
              </Button>
              <Button variant="primary" onClick={handleUpdateButtonClick}>
                저장
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
