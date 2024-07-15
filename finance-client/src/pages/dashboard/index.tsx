import { Box, useMediaQuery } from "@mui/material";
import DashboardContainer from "../../components/DashboardContainer";


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
        <DashboardContainer gridArea="sectionA" />
        <DashboardContainer gridArea="sectionB" />
        <DashboardContainer gridArea="sectionC" />
        <DashboardContainer gridArea="sectionD" />
        <DashboardContainer gridArea="sectionE" />
        <DashboardContainer gridArea="sectionF" />
        <DashboardContainer gridArea="sectionG" />
        <DashboardContainer gridArea="sectionH" />
        <DashboardContainer gridArea="sectionI" />
        <DashboardContainer gridArea="sectionJ" />
   
    </Box>
  );
};

export default Dashboard;