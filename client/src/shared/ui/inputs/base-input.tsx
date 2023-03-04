export const BaseInput = ({register, name, placeholder, label}:{register: any, name: string, placeholder: string, label: string}) => {
	return (
		<>
				<label className='font-bold w-full' htmlFor={name}>{label}
				<input placeholder={placeholder} className="mt-4 font-normal rounded-[5px] bg-transparent outline-none border-2 w-full px-6 py-4 border-[#252d35]" type="text" id={name} {...register(name)}/>
				</label>
		</>
	)
}