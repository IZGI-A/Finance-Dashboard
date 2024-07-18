import { useState } from "react";
import { Link } from "react-router-dom";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Box, Typography, useTheme } from "@mui/material";
import FlexContainer from "../../components/FlexContainer";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [activePage, setActivePage] = useState("dashboard");
  return (
    <FlexContainer mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>

      <FlexContainer gap="0.75rem">
        <AcUnitIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Finance App
        </Typography>
      </FlexContainer>

      <FlexContainer gap="2rem">
        {/* &:hover - CSS pseudo-class that targets the hover state of the Box component */}
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setActivePage("dashboard")}
            style={{
              color: activePage === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setActivePage("predictions")}
            style={{
              color: activePage === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Predictions
          </Link>
        </Box>
      </FlexContainer>
    </FlexContainer>
  );
};

export default Navbar;