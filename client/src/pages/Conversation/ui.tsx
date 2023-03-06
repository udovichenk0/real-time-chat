import {useParams} from "react-router-dom";
import {MainLayout} from "@/widgets/layouts/main-layout";

const Conversation = () => {
    const params = useParams()
    console.log(params)
    return (
        <MainLayout>
            Conversation
        </MainLayout>
    )
}

export default Conversation