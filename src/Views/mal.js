import { useSelector, useDispatch } from "react-redux";

export default function Mal() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>mal</h3>
    </div>
  );
}
