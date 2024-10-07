import { useMutation, useQuery } from "react-query";
import { getIncomes, deleteIncome } from "../services/IncomeService.js";

//import to table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";

export const IncomesInformation = (props) => {
  const mutation = useMutation((id) => {
    deleteIncome(id);
  });

  //użycie hooka do informacji o ładowaniu oraz błędzie
  const {
    data: incomes,
    error,
    isLoading,
  } = useQuery("incomesData", getIncomes);

  if (isLoading || mutation.isLoading) return <div>Fetching posts...</div>;
  if (error || mutation.isError)
    return <div>An error occurred: {error.message}</div>;
  // if (mutation.isSuccess) {
  //   return <div>Financial event deleted</div>;
  // }
  //użycie hooka do informacji o ładowaniu oraz błędzie

  const deleteFinancialEvent = (id) => {
    mutation.mutate(id);
  };

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
        Financial event deleted!
      </Alert>
    </Box>
  );

  return (
    <>
      {mutation.isSuccess ? success : null}
      <TableContainer
        component={Paper}
        sx={{
          marginRight: "auto",
          marginLeft: "auto",
          width: "max-content",
          padding: 1,
        }}
      >
        <Table sx={{ tableLayout: "auto" }}>
          <caption>Information about incomes</caption>
          <TableHead>
            <TableRow style={{ backgroundColor: "#99AFF2" }}>
              <TableCell align="center" sx={{ width: "15%" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ width: 100 }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ width: 100 }}>
                Category
              </TableCell>
              <TableCell align="center" sx={{ width: 100 }}>
                Money
              </TableCell>
              <TableCell align="center" sx={{ width: 100 }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>
                Additional action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomes.map((income, key) => {
              return (
                <TableRow key={key}>
                  <TableCell>{income.id}</TableCell>
                  <TableCell align="center">{income.userName}</TableCell>
                  <TableCell align="center">{income.category}</TableCell>
                  <TableCell align="center">
                    {income.amountOfMoney.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">{income.date}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => deleteFinancialEvent(income.id)}>
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                    <Button>
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
