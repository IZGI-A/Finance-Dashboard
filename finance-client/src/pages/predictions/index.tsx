import { Box, Button, Typography, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { useGetFinanceKpisQuery } from '../../state/financeapi';
import DashboardContainer from '../../components/DashboardContainer';
import FlexContainer from '../../components/FlexContainer';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, Legend, Label } from 'recharts';
import { DataPoint } from 'regression';
import * as regression from 'regression';

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredicting, setIsPredicting] = useState(false);
  const { data: KPIData } = useGetFinanceKpisQuery();

  const Data = useMemo(() => {
    if (!KPIData) return [];

    const monthlyData = KPIData[0].monthlyData;
    const revenueData: Array<DataPoint> = monthlyData.map(({ revenue }, index) => [index, revenue]);
    const regressionLine = regression.linear(revenueData);
    console.log(monthlyData.length);
    return monthlyData.map(({ month, revenue }, index) => ({
      name: month.substring(0, 3),
      "Actual Revenue": revenue,
      "Regression Line": regressionLine.predict(index)[1],
      "Predicted Revenue": regressionLine.predict(index + 12)[1],
    }));
  }, [KPIData]);

  const togglePrediction = () => setIsPredicting(!isPredicting);

  return (
    <DashboardContainer width="100%" height="100%" padding="1rem" overflow="hidden">
      <FlexContainer margin="1rem 2rem" gap="2rem">
        <Box>
          <Typography variant="h4" color={palette.primary.main}>Revenue and Predictions</Typography>
          <Typography variant="body1" color={palette.primary[700]}>
            This page displays the revenue and predictions for the next 30 days
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={togglePrediction}>
          {isPredicting ? "Hide Predictions" : "Show Predictions"}
        </Button>
      </FlexContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={Data}
          margin={{ top: 20, right: 75, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            axisLine={false}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label
              value="Revenue in USD"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {isPredicting && (
            <Line
              type="monotone"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
              strokeDasharray="5 5"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardContainer>
  );
};

export default Predictions;
