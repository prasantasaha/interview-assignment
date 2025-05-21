import { Box, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from "@mui/material";
import { useBankContext } from "./BankContext";
import type { ViewType } from "../types";
import { useUserMessage } from "./UserMessageContext";
import { useCallback } from "react";

const StatementView = ({ setView }: { setView: (v: ViewType) => void }) => {
  const { transactions } = useBankContext();
  const { setUserMessage } = useUserMessage();

  const handleBackToMenu = useCallback(() => {
    setView("menu");
    setUserMessage({ message: "" });
  }, [setUserMessage, setView]);

  return (
    <Box mt={2}>
      {transactions.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
          No records found.
        </Typography>
      ) : (
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
      )}
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleBackToMenu}>
        Back to Menu
      </Button>
    </Box>
  );
};

export default StatementView;
