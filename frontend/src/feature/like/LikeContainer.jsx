import { GoHeart, GoHeartFill } from "react-icons/go";

export function LikeContainer() {
  return (
    <div className="d-flex gap-2 h2">
      <div>
        <GoHeart />
        <GoHeartFill />
      </div>
      <div>9</div>
    </div>
  );
}
