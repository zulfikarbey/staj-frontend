import { useSelector } from "react-redux";

export default function Settings() {
  const counter = useSelector((state) => state.counter);
  return (
    <div>
      <h3>ayarlar</h3>
      <p>{counter}</p>
    </div>
  );
}
