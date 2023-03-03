export const BaseAuthInput = ({register, name, placeholder}:{register: any, name: string, placeholder: string}) => {
	return (
		<>
			<label htmlFor={name}>
				<input placeholder={placeholder} className="rounded-[5px] bg-transparent outline-none border-2 w-full px-6 py-4 border-[#252d35]" type="text" id={name} {...register(name)}/>
			</label>
		</>
	)
}