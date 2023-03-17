import { createRouter } from "@/shared/lib/router";
import { lazy } from "react";
import { Home } from "@/pages/Home";
import { RequiredAuth } from "./protected-routes";
import { AuthedRoute } from "@/app/config/protected-routes";
const SignIn = lazy(() => import('@/pages/Auth/Sign-in'))
const SignUp = lazy(() => import('@/pages/Auth/Sign-up'))
export const router = createRouter(
  [
    {
      path: "/",
    element: <AuthedRoute><Home/></AuthedRoute>
    },
    {
      path: '/auth',
      children: [
        {
          path: '/auth/sign-in',
          element: <RequiredAuth><SignIn/></RequiredAuth>
        },
        {
          path: '/auth/sign-up',
          element: <RequiredAuth><SignUp/></RequiredAuth>
        }
      ]
    },
  ]
)
