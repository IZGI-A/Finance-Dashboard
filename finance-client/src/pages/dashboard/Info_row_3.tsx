import { useMemo } from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Cell, Pie, PieChart } from "recharts";
import {
  useGetFinanceKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "../../state/financeapi";
import DashboardContainer from "../../components/DashboardContainer";
import ContainerTitle from "../../components/ContainerTitle";
import FlexContainer from "../../components/FlexContainer";

const Info_row_3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.tertiary[400], palette.tertiary[600]];

  const { data: kpiData } = useGetFinanceKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => [
          { name: key, value },
          { name: `${key} of Total`, value: totalExpenses - value },
        ]
      );
    }
  }, [kpiData]);

  const productColumns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "buyer", headerName: "Buyer", flex: 0.67 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as string[]).length,
    },
  ];

  const dataGridStyles = {
    "& .MuiDataGrid-root": {
      color: palette.grey[300],
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: `1px solid ${palette.grey[800]} !important`,
    },
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: `1px solid ${palette.grey[800]} !important`,
    },
    "& .MuiDataGrid-columnSeparator": {
      visibility: "hidden",
    },
  };

  return (
    <>
      <DashboardContainer gridArea="sectionG">
        <ContainerTitle title="List of Products" sideText={`${productData?.length} products`} />
        <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={dataGridStyles}>
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardContainer>

      <DashboardContainer gridArea="sectionH">
        <ContainerTitle title="Recent Orders" sideText={`${transactionData?.length} latest transactions`} />
        <Box mt="1rem" p="0 0.5rem" height="80%" sx={dataGridStyles}>
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardContainer>

      <DashboardContainer gridArea="sectionI">
        <ContainerTitle title="Expense Breakdown By Category" sideText="+4%" />
        <FlexContainer mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexContainer>
      </DashboardContainer>

      <DashboardContainer gridArea="sectionJ">
        <ContainerTitle title="Overall Summary and Explanation Data" sideText="+15%" />
        <Box height="15px" margin="1.25rem 1rem 0.4rem 1rem" bgcolor={palette.tertiary[800]} borderRadius="1rem">
          <Box height="15px" bgcolor={palette.tertiary[600]} borderRadius="1rem" width="40%" />
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Summary and explanation of the data can be found here
        </Typography>
      </DashboardContainer>
    </>
  );
};

export default Info_row_3;
