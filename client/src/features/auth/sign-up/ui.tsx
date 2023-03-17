import { useAction } from "@/shared/lib/redux"
import { AuthBaseButton } from "@/shared/ui/buttons"
import { RedirectAuthButton } from "@/shared/ui/buttons/redirect-auth-button"
import { BaseInput } from "@/shared/ui/inputs"
import { useForm } from "react-hook-form"
import { registerThunk } from "./model"
import { yupResolver } from "@hookform/resolvers/yup";
import {schema} from "@/features/auth/config";


export const RegisterForm = () => {
	const {register, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			username: '',
			password: ''
		},
		resolver:yupResolver(schema)
	})
	const signUp = useAction(registerThunk)

	const onSubmit = ({username, password}:{username: string, password: string}) => {
		signUp({username, password})
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className=' w-full max-w-[500px] flex flex-col gap-5'>
		<BaseInput register={register} name={'username'} label='Login' placeholder={'Enter login'} errors={errors?.username?.message}/>
		<BaseInput register={register} name={'password'} label='Password' placeholder={'Enter password'} errors={errors?.password?.message}/>
		<div className="flex justify-between">
			<AuthBaseButton title="Sign Up"/>
			<RedirectAuthButton title={'Already have an accound'} redirect={'/auth/sign-in'}/>
		</div>
	</form>
	)
}