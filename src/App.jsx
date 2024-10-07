import { MainPage } from "./components/MainPage.jsx";
import { Form } from "./components/Form.jsx";
import { ExpensesInformation } from "./components/ExpensesInformation.jsx";
import { IncomesInformation } from "./components/IncomesInformation.jsx";
import { Balance } from "./components/BalanceInformation.jsx";
import "./styles/App.css";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <MainPage />

      
      <Routes>
        <Route path="/expenses" element={<ExpensesInformation />} />
        <Route path="/incomes" element={<IncomesInformation />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/form" element={<Form />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
