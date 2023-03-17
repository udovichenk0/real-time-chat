import {FieldErrors} from "react-hook-form";

export const BaseInput = ({register, name, placeholder, label, errors}:{register: any, name: string, placeholder: string, label: string, errors?: string}) => {
	return (
		<div className={'flex flex-col w-full'}>
			{errors
				? <div className={'text-red-500'}>{errors}</div>
				: <label className='font-bold w-full relative' htmlFor={name}>{label}</label>}
				<input placeholder={placeholder} type={name =='password' ? 'password' : 'text'} className="mt-4 font-normal rounded-[5px] bg-transparent outline-none border-[1px] w-full px-6 py-3 border-[#98DFD6]" id={name} {...register(name)}/>
		</div>
	)
}