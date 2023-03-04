import { sessionModel } from "@/entities/session"
import { useAppSelector } from "@/shared/lib/redux/use-app-selector"
import {Navigate} from 'react-router-dom'
import {useEffect} from "react";
import {router} from "@/app/config/router";
export const AuthedRoute = ({children}:any) => {
	const isAuthenticated = useAppSelector(sessionModel.selectors.isAuthenticated)
	if(isAuthenticated){
		return children
	}
	return <Navigate to={'/auth/sign-in'}/>
}