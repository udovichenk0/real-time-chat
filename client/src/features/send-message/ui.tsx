import {socket} from "@/shared/lib/socket/socket";
import {useForm} from "react-hook-form";

export const MessageForm = ({friendId}:{friendId: string}) => {
    const {register, handleSubmit, reset} = useForm({defaultValues:{message:''}})
    const onSubmit = ({message}:{message:string}) => {
        if(message){
            socket.emit('send-message', {recipientId: friendId,message})
            reset()
        }
    }
    return (
        <form className={'w-full flex items-center mb-4 gap-4 px-4'} onSubmit={handleSubmit(onSubmit)}>
            <input className={'w-full px-4 py-4 rounded-[5px] bg-transparent border-2 border-[#8B8B8BB7] outline-none text-white '} {...register('message')} />
            <button className={'rounded-[5px] bg-[#72aadb] text-dark-blue px-10 h-full'}>
                Send
            </button>
        </form>
    )
}