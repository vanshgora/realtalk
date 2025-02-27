import { MantineProvider } from "@mantine/core";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import './App.css';

function App() {

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </MantineProvider>

  );
}

export default App;