import { useSignInMutation } from "@/service"
import { useForm } from "react-hook-form"
import { AuthBaseButton } from "../../../components/buttons"
import { RedirectAuthButton } from "../../../components/buttons/redirect-auth-button"
import { BaseAuthInput } from "../../../components/inputs"

export const SignIn = () => {
	const [signIn, result] = useSignInMutation()
	const {register, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			username: '',
			password: ''
		}
	})
	const onSubmit = ({username, password}:{username: string, password: string}) => {
		signIn({username, password})
	}
	return (
		<div className="h-screen bg-[#172028] flex items-center justify-center text-white flex-col">
			<h1 className="font-bold mb-10">Login</h1>
			<>
			<form onSubmit={handleSubmit(onSubmit)} className=' w-full max-w-[500px] flex flex-col gap-5'>
				<BaseAuthInput register={register} name={'username'} placeholder={'Enter login'}/>
				<BaseAuthInput register={register} name={'password'} placeholder={'Enter password'}/>
				<div className="flex justify-between">
					<AuthBaseButton title="Log In"/>
					<RedirectAuthButton title={'Create Account'} redirect={'/auth/sign-up'}/>
				</div>
			</form>
			</>
		</div>
	)
}