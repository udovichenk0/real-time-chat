import { LoginForm } from "@/features/auth/sign-in"
const SignIn = () => {
	return (
		<div className="h-screen bg-[#404258] flex items-center justify-center text-white flex-col">
			<h1 className="font-bold mb-10">Login</h1>
			<LoginForm/>
		</div>
	)
}

export default SignIn