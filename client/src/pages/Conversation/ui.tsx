import {useParams} from "react-router-dom";
import {MainLayout} from "@/widgets/layouts/main-layout";
import {useForm} from "react-hook-form";
import {AuthBaseButton} from "@/shared/ui/buttons";

const Conversation = () => {
    const params = useParams()
    console.log(params)
    const {register, handleSubmit} = useForm({defaultValues:{message:''}})
    const onSubmit = ({message}:{message:string}) => {
        console.log(message)
    }
    return (
        <MainLayout>
            <div className='flex flex-col w-full'>
                <div className={'flex-1'}>
                    s
                </div>
                <div className={'flex items-center mb-4 gap-4 px-4'}>
                    <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
                        <input className={'w-full px-4 py-6 rounded-[5px] bg-transparent border-2 border-[#8B8B8BB7] outline-none text-white text-[21px]'} {...register('message')} />
                    </form>
                    <button className={'rounded-[5px] font-bold text-xl  bg-[#72aadb] text-dark-blue px-10 h-full'}>
                        Send
                    </button>
                </div>
                </div>
        </MainLayout>
    )
}

export default Conversation