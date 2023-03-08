import {useState} from "react"
import {useSocket} from "@/processes/socket";
import {Chat} from "@/features/chat";
import {Sidebar} from "@/widgets/Sidebar";

export const Home = () => {
		const [message, setMessage] = useState()
		useSocket({setMessage})

	const [chat, setChat] = useState('')

	return (
		<div className="bg-[#404258] h-screen flex"> {/*#7B8FA1*/}
			<Sidebar setChat={setChat}/>
			{chat
			? <Chat/>
			: <div>Select a chat</div>}
		</div>
	)
}