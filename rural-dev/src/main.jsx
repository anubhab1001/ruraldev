<<<<<<< HEAD
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./assets/components/home/home";
import Calculator from "./assets/components/finnaceCalculator/FinanceCalculator.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './assets/components/home/home'
import Workshop from './assets/components/workshop/workshop'
import Marketplace from './assets/components/marketplace/marketplace'
import Job from './assets/components/job/job'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
>>>>>>> upstream/main

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
<<<<<<< HEAD
        path: "/finance-calculator",
        element: <Calculator />,
      },
    ],
  },
]);
=======
        path : 'workshop',
        element : <Workshop />,
      },
      {
        path : 'job',
        element : <Job />,
      },
      {
        path : 'marketplace',
        element : <Marketplace />,
      },
      
      
    ]
  }
]
)
>>>>>>> upstream/main

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/
