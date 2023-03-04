import { RouterProvider } from 'react-router-dom'
import { router } from './config/router'
import { Suspense, useEffect } from 'react'
import {useSignInQuery} from "@/shared/api";
import {useAction} from "@/shared/lib/redux";
import { sessionModel } from '@/entities/session';

function App() {
    const data = useSignInQuery();
    const setProfile = useAction(sessionModel.actions.setProfile);
    const login = useAction(sessionModel.actions.login)
    useEffect(() => {
        if (data.data) {
            setProfile(data.data)
            login()
        }
    }, [data]);
  return (
      <Suspense fallback={'loading..'}>
          <RouterProvider router={router}/>
      </Suspense>
  )
}

export default App
