import { Switch, alpha, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const CustomSwitch = styled(Switch)(({ theme }) => {
  const { darkMode } = useSelector((state: RootState) => state);
  const color = darkMode.isDarkMode ? "#A5C9CA" : "#9CCCAF";

  return {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: color,
      "&:hover": {
        backgroundColor: alpha(color, theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: color,
    },
  };
});

export default CustomSwitch;
