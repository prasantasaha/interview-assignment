import { useState } from "react";
import { Container, Typography, Paper, ThemeProvider, CssBaseline } from "@mui/material";
import MenuView from "./components/MenuView";
import TransactionView from "./components/TransactionView";
import StatementView from "./components/StatementView";
import QuitView from "./components/QuitView";
import { BankProvider } from "./components/BankContext";
import { UserMessageProvider } from "./components/UserMessageContext";
import type { ViewType } from "./types";
import theme from "./theme";

function AppContent() {
  const [view, setView] = useState<ViewType>("menu");

  const views = {
    menu: <MenuView setView={setView} />,
    deposit: <TransactionView view="deposit" setView={setView} />,
    withdraw: <TransactionView view="withdraw" setView={setView} />,
    statement: <StatementView setView={setView} />,
    quit: <QuitView setView={setView} />,
  };

  return (
    <Container data-testid="app-root" maxWidth="sm" sx={{ minWidth: { xs: 300, sm: 600 } }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: 6 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to AwesomeGIC Bank!
        </Typography>
        {views[view] || null}
      </Paper>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BankProvider>
        <UserMessageProvider>
          <AppContent />
        </UserMessageProvider>
      </BankProvider>
    </ThemeProvider>
  );
}

export default App;
