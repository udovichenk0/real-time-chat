import { Page403 } from "@/pages/_403";
import { createRouter } from "@/shared/lib/router";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../../pages/Home";
const SignIn = lazy(() => import('@/pages/Auth/Sign-in'))
const SignUp = lazy(() => import('@/pages/Auth/Sign-up'))
export const router = createRouter(
  [
    {
      path: "/",
    element: <Home/>
    },
    {
      path: '/auth',
      children: [
        {
          path: '/auth/sign-in',
          element: <SignIn/>
        },
        {
          path: '/auth/sign-up',
          element: <SignUp/>
        }
      ]
    },
    {
      path: '/403',
      element: <Page403/>
    }
  ]
)
