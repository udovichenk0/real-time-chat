export const BaseInput = ({register, name, placeholder, label}:{register: any, name: string, placeholder: string, label: string}) => {
	return (
		<>
			<label className='font-bold w-full relative' htmlFor={name}>{label}
				<input placeholder={placeholder} className="mt-4 font-normal rounded-[5px] bg-transparent outline-none border-[1px] w-full px-6 py-3 border-[#98DFD6]" type="text" id={name} {...register(name)}/>
			</label>
		</>
	)
}