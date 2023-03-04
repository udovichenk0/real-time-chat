import { PropsWithChildren, ReactNode, useRef, useState } from "react"

export const BaseModal = ({children, toggle, opened}:
	{
		children: ReactNode,
		toggle: (state: boolean) => void,
		opened: boolean
	}) => {
	const ref = useRef(null)
	if(!opened) return null
	return (
		<div ref={ref} onClick={() => console.log('close')} className="absolute w-full flex items-center justify-center h-screen left-0 top-0 bg-[#0000002f]">
			<div className="w-[400px] bg-[#2e3847] text-white rounded-md">
				<div className="flex justify-between p-4">
					<h2 className="font-bold text-[20px]">Add a friend!</h2>
					<button onClick={() => toggle(false)}>X</button>
				</div>
			</div>
		</div>
	)
}