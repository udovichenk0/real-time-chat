import { selectors } from "@/models/session"
import { useAppSelector } from "@/shared/hooks/use-app-selector"
import { PropsWithChildren } from "react"
import {Navigate} from 'react-router-dom'
export const AuthedRoute = ({children}:PropsWithChildren) => {
	const isAuthenticated = useAppSelector(selectors.isAuthenticated)
	if(isAuthenticated){
		return children
	}

}