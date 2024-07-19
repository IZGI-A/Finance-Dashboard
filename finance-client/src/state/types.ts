export interface GetFinanceKpisResponse {
    id: string;
    _id: string;
    __v: number;
    totalExpenses: number;
    totalRevenue: number;
    totalProfit: number;
    expensesByCategory: ExpensesByCategory;
    monthlyData: Array<MonthlyData>;
    dailyData: Array<DailyData>;
    createdAt: string;
    updatedAt: string;

}

export interface ExpensesByCategory {
    salaries: number;
    supplies: number;
    services: number;
}

export interface MonthlyData {
    id: string;
    month: string;
    revenue: number;
    expenses: number;
    operationalExpenses: number;
    nonOperationalExpenses: number;

}

export interface DailyData {
    id: string;
    date: string;
    revenue: number;
    expenses: number;
}

export interface GetProductsResponse {
    id: string;
    _id: string;
    __v: number;
    price: number;
    expense: number;
    transaction: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface GetTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    amount: number;
    buyer: string;
    productIss: Array<string>;
    createdAt: string;
    updatedAt: string;
}