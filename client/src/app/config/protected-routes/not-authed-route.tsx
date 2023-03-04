import { sessionModel } from "@/entities/session"
import { useAppSelector } from "@/shared/lib/redux/use-app-selector"
import {Navigate} from 'react-router-dom'
export const RequiredAuth = ({children}:any) => {
	const isAuthenticated = useAppSelector(sessionModel.selectors.isAuthenticated)
	if(!isAuthenticated){
		return children
	}
	return <Navigate to={'/'}/>
}