import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import ShowSubjects from "./predmeti/ShowSubjects";
import NewSubject from "./predmeti/NewSubject";
import Subject from "./predmeti/Subject";
import ErrorDisplay from "./ErrorDisplay";
import EditSubject from "./predmeti/EditSubject";
import { checkUser } from "./login_logic";
import ShowUcenici from "./ucenici/ShowUcenici";
import NewUcenik from "./ucenici/NewUcenik";
import Ucenik from "./ucenici/Ucenik";
import EditUcenik from "./ucenici/EditUcenik";
import { createBrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const subjectLoader = async () => {
  const user = checkUser([1, 2, 3, 4]);
  const response = await fetch("http://localhost:8080/ednevnik/predmeti", {
    headers: {
      Authorization: `Basic ${user.authdata}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch subjects");
  }
  return response.json();
};

// Postavite loader funkciju u router konfiguraciji
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/subjects",
        element: <ShowSubjects />,
        loader: subjectLoader,
        errorElement: <ErrorDisplay entity="predmeti" />,
      },
      {
        path: "subjects/add_new_subject",
        element: <NewSubject />,
      },
      {
        path: "subjects/findById/:id",
        element: <Subject />,
        loader: async ({ params }) => {
          const user = checkUser([1, 2, 3, 4]);
          if (!user) {
            throw new Error("Unauthorized access");
          }
          const response = await fetch(
            `http://localhost:8080/ednevnik/predmeti/${params.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${user.authdata}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch subject");
          }
          return response.json();
        },
        errorElement: <ErrorDisplay entity="predmeti" />,
      },
      {
        path: "subjects/update/:id",
        element: <EditSubject />,
        loader: async ({ params }) => {
          const user = checkUser([1, 2, 3, 4]);
          if (!user) {
            throw new Error("Unauthorized access");
          }
          const response = await fetch(
            `http://localhost:8080/ednevnik/predmeti/${params.id}`,
            {
              headers: {
                Authorization: `Basic ${user.authdata}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch subject");
          }
          return response.json();
        },
        errorElement: <ErrorDisplay entity="predmeti" />,
      },
      {
        path: "ucenici",
        element: <ShowUcenici />,
        loader: async ({ params }) => {
          const user = checkUser([1, 2, 3, 4]);
          if (!user) {
            throw new Error("Unauthorized access");
          }
          const response = await fetch(
            `http://localhost:8080/ednevnik/ucenici`,
            {
              headers: {
                Authorization: `Basic ${user.authdata}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch ucenik");
          }
          return response.json();
        },
        errorElement: <ErrorDisplay entity="ucenik" />,
      },
      {
        path: "ucenici/add_new_ucenik",
        element: <NewUcenik />,
      },

      {
        path: "ucenici/findById/:id",
        element: <Ucenik />,
        loader: async ({ params }) => {
          const user = checkUser([1, 2, 3, 4]);
          if (!user) {
            throw new Error("Unauthorized access");
          }
          const response = await fetch(
            `http://localhost:8080/ednevnik/ucenici/${params.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${user.authdata}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch ucenik");
          }
          return response.json();
        },
        errorElement: <ErrorDisplay entity="ucenik" />,
      },
      {
        path: "ucenici/update/:id",
        element: <EditUcenik />,
        loader: async ({ params }) => {
          const user = checkUser([1, 2, 3, 4]);
          if (!user) {
            throw new Error("Unauthorized access");
          }
          const response = await fetch(
            `http://localhost:8080/ednevnik/ucenici/${params.id}`,
            {
              headers: {
                Authorization: `Basic ${user.authdata}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch subject");
          }
          return response.json();
        },
        errorElement: <ErrorDisplay entity="ucenik" />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
