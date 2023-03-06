import { Page403 } from "@/pages/_403";
import { createRouter } from "@/shared/lib/router";
import { lazy } from "react";
import { Home } from "@/pages/Home";
import { RequiredAuth } from "./protected-routes";
import { AuthedRoute } from "@/app/config/protected-routes";
const SignIn = lazy(() => import('@/pages/Auth/Sign-in'))
const SignUp = lazy(() => import('@/pages/Auth/Sign-up'))
const Conversation = lazy(() => import('@/pages/Conversation'))
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
      {
          path: '/:userId',
          element: <AuthedRoute><Conversation/></AuthedRoute>
      },
    {
      path: '/403',
      element: <Page403/>
    }
  ]
)
