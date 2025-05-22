import { Box, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from "@mui/material";
import { useBankContext } from "./BankContext";
import type { ViewComponent } from "../types";
import { useUserMessage } from "./UserMessageContext";
import { useCallback } from "react";

const StatementView = ({ setView }: ViewComponent) => {
  const { transactions } = useBankContext();
  const { setUserMessage } = useUserMessage();

  const handleBackToMenu = useCallback(() => {
    setView("menu");
    setUserMessage({ message: "" });
  }, [setUserMessage, setView]);

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      {transactions.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
          No records found.
        </Typography>
      ) : (
        <Box sx={{ maxHeight: 400, overflow: "auto" }}>
          <Table
            stickyHeader
            sx={{
              "& thead": {
                position: "sticky",
                top: 0,
                backgroundColor: "background.paper",
              },
              "& tbody": {
                display: "block",
                overflowY: "auto",
                height: "100%",
              },
              "& thead tr, & tbody tr": {
                display: "table",
                width: "100%",
                tableLayout: "fixed",
              },
            }}
          >
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
                  <TableCell data-testid={`transaction-amount-${idx}`}>{formatNumber(t.amount)}</TableCell>
                  <TableCell data-testid={`transaction-balance-${idx}`}>{formatNumber(t.balance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleBackToMenu}>
        Back to Menu
      </Button>
    </Box>
  );
};

export default StatementView;
