import { useAction } from "@/shared/lib/redux"
import { AuthBaseButton } from "@/shared/ui/buttons"
import { RedirectAuthButton } from "@/shared/ui/buttons/redirect-auth-button"
import { BaseInput } from "@/shared/ui/inputs"
import { useForm } from "react-hook-form"
import { loginThunk } from "./model"
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "@/features/auth/config";


export const LoginForm = () => {
	const {register, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			username: 'denzeldenis',
			password: '2j8w6d12'
		},
		resolver: yupResolver(schema)
	})
	const login = useAction(loginThunk)
	const onSubmit = ({username, password}:{username: string, password: string}) => {
		login({username, password})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className=' w-full max-w-[500px] flex flex-col gap-5'>
		<BaseInput register={register} name={'username'} label={'Login'} placeholder={'Enter login'} errors={errors?.username?.message}/>
		<BaseInput register={register} name={'password'} label={'Password'} placeholder={'Enter password'} errors={errors?.password?.message}/>
		<div className="flex justify-between">
			<AuthBaseButton title="Log In"/>
			<RedirectAuthButton title={'Create Account'} redirect={'/auth/sign-up'}/>
		</div>
	</form>
	)
}