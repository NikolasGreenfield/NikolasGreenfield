import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import './App.scss';
import MainPage from './Components/MainPage/MainPage';
import {red} from '@mui/material/colors';

// Defines the paths for routing between pages
const router = createBrowserRouter([
  {path: "/", element: <MainPage/>},
  {path: "/portfolio", element: <div>Portfolio!</div>},
]);

// Defines the theme used for mui components.
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: red,
  }
});

/**
 * Main component of the application which routes between pages.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
