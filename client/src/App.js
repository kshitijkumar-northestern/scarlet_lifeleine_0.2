// import React from "react";
// import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "@mui/material/styles";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import CssBaseline from "@mui/material/CssBaseline";
// import { AuthProvider } from "./contexts/AuthContext";
// import { AlertProvider } from "./contexts/AlertContext";
// import { theme } from "./styles/theme";
// import AppRoutes from "./routes";
// import Navbar from "./components/common/Navbar";
// import ErrorBoundary from "./components/common/ErrorBoundary";

// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       {/* Pass theme as prop, not createAppTheme */}
//       <CssBaseline />
//       <ErrorBoundary>
//         <AlertProvider>
//           <AuthProvider>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <BrowserRouter>
//                 <Navbar />
//                 <AppRoutes />
//               </BrowserRouter>
//             </LocalizationProvider>
//           </AuthProvider>
//         </AlertProvider>
//       </ErrorBoundary>
//     </ThemeProvider>
//   );
// };

// export default App;
// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
