import {BaseInput} from "@/shared/ui/inputs";
import {useForm} from "react-hook-form";
import {AuthBaseButton} from "@/shared/ui/buttons";
import {useAddFriendMutation} from "@/shared/api/ApiFriend";
import {useAppSelector} from "@/shared/lib/redux";
import { sessionModel } from "@/entities/session";
export const AddFriendForm = ({toggleModal}:{toggleModal: (b:boolean) => void}) => {
    const profile = useAppSelector(sessionModel.selectors.profile)

    const [addFriend] = useAddFriendMutation()
    const {register, handleSubmit} = useForm({
        defaultValues: {
            username: ''
        }
    })
    const onSubmit = ({username}:{username: string}) => {
        addFriend({userId: profile._id, friendName: username})
        toggleModal(false)
    }
    return (
        <form className='flex flex-col gap-4 items-end w-full' onSubmit={handleSubmit(onSubmit)}>
            <BaseInput register={register} name={"username"} label={"Friend's name"} placeholder={'Enter name of a user'}/>
            <div className='inline'>
            <AuthBaseButton title={'Submit'}/>
            </div>
        </form>
    )
}