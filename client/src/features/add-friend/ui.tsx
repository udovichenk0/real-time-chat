import {BaseInput} from "@/shared/ui/inputs";
import {useForm} from "react-hook-form";
import {AuthBaseButton} from "@/shared/ui/buttons";

export const AddFriendForm = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            username: ''
        }
    })
    const onSubmit = (data:any) => {
        console.log(data)
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