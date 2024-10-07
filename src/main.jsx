import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  Routes,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const queryClient = new QueryClient();
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <div>Error</div>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <RouterProvider router={router} /> */}

      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);



//colors 

//accents  - green #A3BF78
// light #D7D9D9
// primary #99AFF2
// light dark #737373
// dark #404040