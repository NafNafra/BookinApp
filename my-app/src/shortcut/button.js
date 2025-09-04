import { useNavigate } from "react-router-dom";

export default function Boutons() {
  const navigate = useNavigate();

  return (
    <div><button>Book</button><button onClick={() => { navigate('/booking') }}>Book</button></div>
  )
}