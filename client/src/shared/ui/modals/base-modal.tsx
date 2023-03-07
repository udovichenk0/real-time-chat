import React, {ReactNode, useRef} from "react"

export const BaseModal = ({children, toggle, opened, title}:
	{
		children: ReactNode,
		toggle: (state: boolean) => void,
		opened: boolean,
		title: string
	}) => {
	const ref = useRef(null)
	if(!opened) return null

	const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
		if(e.target == ref.current) toggle(false)
	};

	return (
		<div ref={ref} onClick={(e) => handleCloseModal(e)} className="absolute w-full flex items-center justify-center h-screen left-0 top-0 bg-[#0000002f]">
			<div className="w-[500px] bg-[#2e3847] text-white rounded-md">
				<div className="flex justify-between p-5">
					<h2 className="font-bold text-[20px]">{title}</h2>
					<button onClick={() => toggle(false)}>X</button>
				</div>
				<div className='p-5'>
					{children}
				</div>
			</div>
		</div>
	)
}