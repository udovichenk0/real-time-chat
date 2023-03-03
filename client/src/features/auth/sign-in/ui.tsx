import { useAction } from "@/shared/lib/redux"
import { AuthBaseButton } from "@/shared/ui/buttons"
import { RedirectAuthButton } from "@/shared/ui/buttons/redirect-auth-button"
import { BaseAuthInput } from "@/shared/ui/inputs"
import { useForm } from "react-hook-form"
import { login } from "./api"
import { loginThunk } from "./model"

export const LoginForm = () => {
	const {register, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			username: 'denzeldenis',
			password: '2j8w6d12'
		}
	})
	const login = useAction(loginThunk)
	const onSubmit = ({username, password}:{username: string, password: string}) => {
		login({username, password})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className=' w-full max-w-[500px] flex flex-col gap-5'>
		<BaseAuthInput register={register} name={'username'} placeholder={'Enter login'}/>
		<BaseAuthInput register={register} name={'password'} placeholder={'Enter password'}/>
		<div className="flex justify-between">
			<AuthBaseButton title="Log In"/>
			<RedirectAuthButton title={'Create Account'} redirect={'/auth/sign-up'}/>
		</div>
	</form>
	)
}