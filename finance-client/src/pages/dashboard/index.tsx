import { Box, useMediaQuery } from "@mui/material";
import Info_row_1 from "./Info_row_1";
import Info_row_2 from "./Info_row_2";
import Info_row_3 from "./Info_row_3";


const largeScreenLayout = `
  "sectionA sectionB sectionC"
  "sectionA sectionB sectionC"
  "sectionA sectionB sectionC"
  "sectionA sectionB sectionF"
  "sectionD sectionE sectionF"
  "sectionD sectionE sectionF"
  "sectionD sectionH sectionI"
  "sectionG sectionH sectionI"
  "sectionG sectionH sectionJ"
  "sectionG sectionH sectionJ"
`;

const smallScreenLayout = `
  "sectionA"
  "sectionA"
  "sectionA"
  "sectionA"
  "sectionB"
  "sectionB"
  "sectionB"
  "sectionB"
  "sectionC"
  "sectionC"
  "sectionC"
  "sectionD"
  "sectionD"
  "sectionD"
  "sectionE"
  "sectionE"
  "sectionF"
  "sectionF"
  "sectionF"
  "sectionG"
  "sectionG"
  "sectionG"
  "sectionH"
  "sectionH"
  "sectionH"
  "sectionH"
  "sectionI"
  "sectionI"
  "sectionJ"
  "sectionJ"
`;

const Dashboard = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isLargeScreen
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: largeScreenLayout,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: smallScreenLayout,
            }
      }
    >
        <Info_row_1 /> 
        <Info_row_2 />
        <Info_row_3 /> 
   
    </Box>
  );
};

export default Dashboard;