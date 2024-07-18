import DashboardContainer from "../../components/DashboardContainer";
import { useGetFinanceKpisQuery } from "../../state/financeapi";

const Info_row_1 = () => {
    const {data}  = useGetFinanceKpisQuery()
  return (
    <>
        <DashboardContainer gridArea="sectionA" />
        <DashboardContainer gridArea="sectionB" />
        <DashboardContainer gridArea="sectionC" />
    </>
  )
}

export default Info_row_1