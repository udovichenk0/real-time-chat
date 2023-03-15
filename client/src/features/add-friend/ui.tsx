import {BaseInput} from "@/shared/ui/inputs";
import {useForm} from "react-hook-form";
import {AuthBaseButton} from "@/shared/ui/buttons";
import {socket} from "@/shared/lib/socket";

export const AddFriendForm = ({toggleModal}:{toggleModal: (b:boolean) => void}) => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            username: ''
        }
    })
    const onSubmit = ({username}:{username: string}) => {
        socket.emit('add-friend', username)
        toggleModal(false)
    }
    return (
        <form className='flex flex-col gap-2 items-end w-full relative z-[100] p-5' onSubmit={handleSubmit(onSubmit)}>
            <BaseInput register={register} name={"username"} label={"Friend's name"} placeholder={'Enter name of a user'}/>
            <div className='inline'>
            <AuthBaseButton title={'Submit'}/>
            </div>
        </form>
    )
}