import { sessionModel } from "@/models/session"
import { useAppSelector } from "@/shared/lib/redux/use-app-selector"
import { PropsWithChildren } from "react"
import {Navigate} from 'react-router-dom'
export const AuthedRoute = ({children}:PropsWithChildren) => {
	const isAuthenticated = useAppSelector(sessionModel.selectors.isAuthenticated)
	if(!isAuthenticated){
		return children
	}
	return <Navigate to={'/'}/>
}