import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useBankContext } from "./BankContext";
import type { ViewType } from "../constants";

const StatementView = ({ setView }: { setView: (v: ViewType) => void }) => {
  const { transactions } = useBankContext();
  return (
    <Box mt={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((t, idx) => (
            <TableRow key={idx}>
              <TableCell>{t.date}</TableCell>
              <TableCell>{t.amount.toFixed(2)}</TableCell>
              <TableCell>{t.balance.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => setView("menu")}
      >
        Back to Menu
      </Button>
    </Box>
  );
};

export default StatementView;
