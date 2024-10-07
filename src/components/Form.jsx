import { useState } from "react";
import { useMutation } from "react-query";
import { createIncome } from "../services/IncomeService.js";
import { createExpense } from "../services/ExpenseService.js";
//import to button
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CheckIcon from "@mui/icons-material/Check";

//import to form
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

//import to datepicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

export const Form = () => {
  const [financialEvent, setFinancialEvent] = useState("expense");
  const [userName, setUserName] = useState("Karolina");
  const [category, setCategory] = useState("Household");
  const [amountOfMoney, setAmountOfMoney] = useState("0.00");
  const [date, setDate] = useState("");

  const mutation = useMutation((newFinancialEvent) => {
    if (financialEvent == "expense") {
      createExpense(newFinancialEvent);
    } else {
      createIncome(newFinancialEvent);
    }
  });

  const submitData = () => {
    mutation.mutate({
      financialEvent,
      userName,
      category,
      amountOfMoney,
      date,
    });
  };

  if (mutation.isLoading) {
    return <div>Updating...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  const success = (
    <Box
      sx={{
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 2,
        px: 2,
      }}
    >
      <Alert
        severity="success"
        icon={<CheckIcon fontSize="inherit" />}
        sx={{ textAlign: "center" }}
      >
        <AlertTitle>Success</AlertTitle>
        Financial event added!
      </Alert>
    </Box>
  );

  let categories;

  const expenseCategories = [
    "Household",
    "Car",
    "Food",
    "Entertainment",
    "Bills",
    "Healthcare",
    "Personal",
    "Savings",
  ];

  const incomesCategories = [
    "Earned income",
    "Passive income",
    "Portfolio income",
  ];

  if (financialEvent === "expense") {
    categories = expenseCategories;
  } else {
    categories = incomesCategories;
  }

  return (
    <>
      {mutation.isSuccess ? success : null}
      <Box display={"flex"} justifyContent="space-between" alignItems="center">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="expense-or-income-label">
            Expense or income:
          </InputLabel>
          <Select
            labelId="expense-or-income-label"
            id="expense-or-income"
            value={financialEvent}
            onChange={(e) => {
              setFinancialEvent(e.target.value);
              setCategory(
                e.target.value === "expense"
                  ? expenseCategories[0]
                  : incomesCategories[0]
              );
            }}
          >
            <MenuItem value="expense">Expense</MenuItem>
            <MenuItem value="income">Income</MenuItem>
          </Select>
        </FormControl>
        {/* //wybierz do ktorej tabeli ma zostac dodany */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="userName-label">Name:</InputLabel>
          <Select
            labelId="userName-label"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          >
            <MenuItem value="Karolina">Karolina</MenuItem>
            <MenuItem value="Wojtek">Wojtek</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-label">Category:</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <TextField
            id="standard-number"
            onChange={(e) => {
              setAmountOfMoney(e.target.value);
            }}
            label="Money:"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </FormControl>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date:"
              onChange={(e) => {
                setDate(e);
              }}
            />
          </LocalizationProvider>
        </FormControl>
        <Button onClick={submitData} variant="outlined" endIcon={<SendIcon />}>
          Save
        </Button>
      </Box>
    </>
  );
};
