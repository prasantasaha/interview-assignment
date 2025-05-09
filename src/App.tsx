import { useState } from "react";
import { Container, Typography, Paper, ThemeProvider, CssBaseline } from "@mui/material";
import MenuView from "./components/MenuView";
import TransactionView from "./components/TransactionView";
import StatementView from "./components/StatementView";
import QuitView from "./components/QuitView";
import { BankProvider } from "./components/BankContext";
import { UserMessageProvider } from "./components/UserMessageContext";
import type { ViewType } from "./constants";
import theme from "./theme";

function AppContent() {
  const [view, setView] = useState<ViewType>("menu");

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: 6 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to AwesomeGIC Bank!
        </Typography>
        {view === "menu" && <MenuView setView={setView} />}
        {(view === "deposit" || view === "withdraw") && <TransactionView view={view} setView={setView} />}
        {view === "statement" && <StatementView setView={setView} />}
        {view === "quit" && <QuitView setView={setView} />}
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
