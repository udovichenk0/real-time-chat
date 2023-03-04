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
    console.log(data)
    useEffect(() => {
        console.log(data.data)
        if (data.data) {
            console.log("hello")
            setProfile(data.data)
            login()
        }
    }, [data]);
    // if(data.isLoading) return null
  return (
      <Suspense fallback={'loading..'}>
          <RouterProvider router={router}/>
      </Suspense>
  )
}

export default App
