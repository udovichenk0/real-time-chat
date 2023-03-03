import { RegisterForm } from "@/features/auth/sign-up"
const SignUp = () => {
	return (
		<div className="h-screen bg-[#172028] flex items-center justify-center text-white flex-col">
			<h1 className="font-bold mb-10">Register</h1>
			<RegisterForm/>
		</div>
	)
}
export default SignUp