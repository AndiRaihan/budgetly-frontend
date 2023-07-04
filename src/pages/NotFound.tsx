import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="my-auto flex flex-col">
      <h1 className=" my-10">Page Not Found</h1>
      <Button className="w-80 self-center" variant="outlined" onClick={() => navigate(-1)}>
        Go to Previous Page
      </Button>
    </div>
  );
}
