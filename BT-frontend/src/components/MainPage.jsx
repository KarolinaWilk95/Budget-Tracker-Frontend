import { Link } from "react-router-dom";
import { Balance } from "./BalanceInformation";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";

export const MainPage = () => {
  return (
    <>
      <div>
        <Typography
          variant="h3"
          color="#404040
"
        >
          Your daily budget tracker
        </Typography>
      </div>
      <div>
        <Balance />
      </div>
      <ButtonGroup size="large" aria-label="Large button group" sx={{ p: 4 }}>
        <Button size="large" component={Link} to="/expenses">
          Information about expenses
        </Button>
        <Button size="large" component={Link} to="/incomes">
          Information about incomes
        </Button>
        <Button size="large" component={Link} to="/form">
          Add financial event
        </Button>
        <Button size="large" component={Link} to="/">
          Go to main page
        </Button>
      </ButtonGroup>
    </>
  );
};
