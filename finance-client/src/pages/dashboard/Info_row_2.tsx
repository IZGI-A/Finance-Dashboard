import { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  Tooltip
} from "recharts";
import {
  useGetFinanceKpisQuery,
  useGetProductsQuery
} from "../../state/financeapi";
import ContainerTitle from "../../components/ContainerTitle";
import DashboardContainer from "../../components/DashboardContainer";
import FlexContainer from "../../components/FlexContainer";

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 800 },
];

const Info_row_2 = () => {
  const { palette } = useTheme();
  const pieColors = ["orange", palette.primary[300]];
  const { data: operationalData } = useGetFinanceKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => ({
          name: month.substring(0, 3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses,
        })
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => ({
        id: _id,
        price: price,
        expense: expense,
      }))
    );
  }, [productData]);

  return (
    <>
      <DashboardContainer gridArea="sectionD">
        <ContainerTitle
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{ top: 20, right: 0, left: -10, bottom: 55 }}
          >
            <CartesianGrid vertical={false} stroke={palette.secondary[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardContainer>

      <DashboardContainer gridArea="sectionE">
        <ContainerTitle title="Campaigns and Targets" sideText="+4%" />
        <FlexContainer mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart width={110} height={100} margin={{ top: 0, right: -10, left: 10, bottom: 0 }}>
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={25}
              outerRadius={39}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[600]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">Profit Margins</Typography>
            <Typography variant="h6">Margins are up by 30% from last month.</Typography>
          </Box>
        </FlexContainer>
      </DashboardContainer>

      <DashboardContainer gridArea="sectionF">
        <ContainerTitle title="Product Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 25, bottom: 40, left: -10 }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.secondary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardContainer>
    </>
  );
};

export default Info_row_2;
