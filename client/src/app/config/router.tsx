import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "../../pages/Auth/Sign-in";
import { SignUp } from "../../pages/Auth/Sign-up";
import { Home } from "../../pages/Home";

export const router = createBrowserRouter([
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
  }
]);
