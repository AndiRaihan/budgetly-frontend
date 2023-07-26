import { Switch, alpha, styled } from "@mui/material";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#9CCCAF",
    "&:hover": {
      backgroundColor: alpha("#9CCCAF", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#9CCCAF",
  },
}));

export default CustomSwitch;
