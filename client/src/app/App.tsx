import axios from 'axios'
import { RouterProvider } from 'react-router-dom'
import { router } from './config/router'
import { store } from './redux/store'
import {Provider} from 'react-redux'

function App() {
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
    </>
  )
}

export default App
