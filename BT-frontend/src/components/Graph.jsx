import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BalanceGraph = ({ expenses, incomes }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "This graph represents incomes and expenses per month",
      },
    },
  };
  const labels = Array(12)
    .fill()
    .map((element, index) => (index + 1).toString());

  const expensesData = Object.groupBy(expenses, (expense) =>
    (new Date(expense.date).getMonth() + 1).toString()
  );
  const incomesData = Object.groupBy(incomes, (income) =>
    (new Date(income.date).getMonth() + 1).toString()
  );

  const expenseDataValue = [];
  const incomeDataValue = [];

  for (const month of labels) {
    if (expensesData[month] != undefined) {
      expenseDataValue.push(
        expensesData[month].reduce(
          (sum, currentValue) => sum + currentValue.amountOfMoney,
          0
        )
      );
    } else {
      expenseDataValue.push(0);
    }
  }
  for (const month of labels) {
    if (incomesData[month] != undefined) {
      incomeDataValue.push(
        incomesData[month].reduce(
          (sum, currentValue) => sum + currentValue.amountOfMoney,
          0
        )
      );
    } else {
      incomeDataValue.push(0);
    }
  }

  const dataGraph = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: expenseDataValue,
        backgroundColor: "#99AFF2",
      },
      {
        label: "Incomes",
        data: incomeDataValue,
        backgroundColor: "#A3BF78",
      },
    ],
  };

  return <Bar options={options} data={dataGraph} />;
};
