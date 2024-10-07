import { useQuery } from "react-query";
import { getIncomes } from "../services/IncomeService.js";
import { getExpenses } from "../services/ExpenseService.js";
import { BalanceGraph } from "./Graph.jsx";

//
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export const Balance = () => {
  const {
    data: incomes,
    error,
    isLoading,
  } = useQuery("incomesData", getIncomes);
  const {
    data: expenses,
    error: expenseError,
    isLoading: isLoadingExpense,
  } = useQuery("expensesData", getExpenses);
  if (isLoading || isLoadingExpense) return <div>Fetching posts...</div>;
  if (error || expenseError)
    return <div>An error occurred: {error.message}</div>;

  const allExpenses = expenses.reduce(
    (sum, currentValue) => sum + currentValue.amountOfMoney,
    0
  );

  const allIncomes = incomes.reduce(
    (sum, currentValue) => sum + currentValue.amountOfMoney,
    0
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, my: "5px" }}
          size="small"
          aria-label="a dense table"
        >
          <caption>Information about financial events</caption>
          <TableHead>
            <TableRow sx={{ bgcolor: "#99AFF2" }}>
              <TableCell align="center">All expenses</TableCell>
              <TableCell align="center">All incomes</TableCell>
              <TableCell align="center">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{allExpenses.toFixed(2)}</TableCell>
              <TableCell align="center">{allIncomes.toFixed(2)}</TableCell>
              <TableCell align="center">
                {(allExpenses - allIncomes).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <BalanceGraph expenses={expenses} incomes={incomes} />
    </>
  );
};
