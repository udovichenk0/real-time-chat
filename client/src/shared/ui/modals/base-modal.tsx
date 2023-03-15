import React, {ReactNode, useRef} from "react"
import {CrossSvg} from "@/shared/ui/modals/cross";

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
			<div className="w-[500px] bg-[#2e3847] text-white rounded-md shadow-2xl">
				<div className="flex justify-between p-5 border-b-[1px] border-[#8b8b8bb8]">
					<h2 className="font-bold text-[18px]">{title}</h2>
					<button onClick={() => toggle(false)}><CrossSvg/></button>
				</div>
				<div>
					{children}
				</div>
			</div>
		</div>
	)
}