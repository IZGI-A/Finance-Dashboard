import { useMemo } from "react";
import DashboardContainer from "../../components/DashboardContainer";
import { useGetFinanceKpisQuery } from "../../state/financeapi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, Legend, Bar, BarChart } from 'recharts';
import { useTheme } from "@mui/material";
import ContainerTitle from "../../components/ContainerTitle";

type Props = {
  title: string;
  subtitle: string;
  sideText: string;
  children: React.ReactNode;
  gridArea: string;
};

const ChartContainer = ({ title, subtitle, sideText, children, gridArea }: Props) => (
  <DashboardContainer gridArea={gridArea}>
    <ContainerTitle title={title} subtitle={subtitle} sideText={sideText} />
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  </DashboardContainer>
);

const InfoRow1 = () => {
  const { data } = useGetFinanceKpisQuery();
  console.log("Finance KPIs data: ", data);
  const { palette } = useTheme();

  const prepareData = (dataKeyMap) => 
    data &&
    data[0].monthlyData.map((entry) => {
      const result = { name: entry.month.substring(0, 3) };
      Object.keys(dataKeyMap).forEach((key) => {
        result[key] = dataKeyMap[key](entry);
      });
      return result;
    });

  const revExp = useMemo(() => prepareData({
    revenue: (entry) => entry.revenue,
    expenses: (entry) => entry.expenses,
  }), [data]);

  const revenueProfit = useMemo(() => prepareData({
    revenue: (entry) => entry.revenue,
    profit: (entry) => (entry.revenue - entry.expenses).toFixed(2),
  }), [data]);

  const revenue = useMemo(() => prepareData({
    revenue: (entry) => entry.revenue,
  }), [data]);

  const renderAreaChart = (data) => (
    <AreaChart
      data={data}
      margin={{ top: 10, right: 25, left: -10, bottom: 50 }}
    >
      <defs>
        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
          <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
          <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" style={{ fontSize: "10px" }} tickLine={false} />
      <YAxis style={{ fontSize: "10px" }} tickLine={false} axisLine={{ strokeWidth: "0" }} domain={[9000, 24000]} />
      <Tooltip />
      <Area type="monotone" dataKey="revenue" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" dot />
      <Area type="monotone" dataKey="expenses" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" dot />
    </AreaChart>
  );

  const renderLineChart = (data) => (
    <LineChart data={data} margin={{ top: 20, right: 0, left: -10, bottom: 55 }}>
      <CartesianGrid vertical={false} stroke={palette.secondary[800]} />
      <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
      <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
      <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
      <Tooltip />
      <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
      <Line yAxisId="left" type="monotone" dataKey="profit" stroke={palette.tertiary[500]} />
      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={palette.primary.main} />
    </LineChart>
  );

  const renderBarChart = (data) => (
    <BarChart data={data} margin={{ top: 17, right: 15, left: -5, bottom: 58 }}>
      <defs>
        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
          <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid vertical={false} stroke={palette.grey[800]} />
      <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
      <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
      <Tooltip />
      <Bar dataKey="revenue" fill="url(#colorRevenue)" />
    </BarChart>
  );

  return (
    <>
      <ChartContainer
        title="Revenue and Expenses"
        subtitle="top line represents revenue, bottom line represents expenses"
        sideText="+4%"
        gridArea="sectionA"
      >
        {renderAreaChart(revExp)}
      </ChartContainer>

      <ChartContainer
        title="Profit and Revenue"
        subtitle="top line represents revenue, bottom line represents expenses"
        sideText="+4%"
        gridArea="sectionB"
      >
        {renderLineChart(revenueProfit)}
      </ChartContainer>

      <ChartContainer
        title="Revenue Month by Month"
        subtitle="graph representing the revenue month by month"
        sideText="+4%"
        gridArea="sectionC"
      >
        {renderBarChart(revenue)}
      </ChartContainer>
    </>
  );
};

export default InfoRow1;
