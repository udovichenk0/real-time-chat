import { useAction } from "@/shared/lib/redux"
import { AuthBaseButton } from "@/shared/ui/buttons"
import { RedirectAuthButton } from "@/shared/ui/buttons/redirect-auth-button"
import { BaseAuthInput } from "@/shared/ui/inputs"
import { useForm } from "react-hook-form"
import { registerThunk } from "./model"

export const RegisterForm = () => {
	const {register, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			username: '',
			password: ''
		}
	})
	const signUp = useAction(registerThunk)

	const onSubmit = ({username, password}:{username: string, password: string}) => {
		signUp({username, password})
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className=' w-full max-w-[500px] flex flex-col gap-5'>
		<BaseAuthInput register={register} name={'username'} placeholder={'Enter login'}/>
		<BaseAuthInput register={register} name={'password'} placeholder={'Enter password'}/>
		<div className="flex justify-between">
			<AuthBaseButton title="Sign Up"/>
			<RedirectAuthButton title={'Already have an accound'} redirect={'/auth/sign-in'}/>
		</div>
	</form>
	)
}