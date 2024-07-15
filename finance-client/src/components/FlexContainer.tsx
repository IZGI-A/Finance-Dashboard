import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexContainer = styled(Box) (({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export default FlexContainer;
