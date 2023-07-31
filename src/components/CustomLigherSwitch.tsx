import { Switch, alpha, styled } from "@mui/material";

const CustomLighterSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#F2FCF6",
    "&:hover": {
      backgroundColor: alpha("#F2FCF6", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#F2FCF6",
  },
}));

export default CustomLighterSwitch;
