import { Loader2 } from "lucide-react"

const LoadingPage = () => {
    return (
        <div className="flex items-center  justify-center  w-[80vw] h-[calc(60vh-4rem)] ">
               <Loader2 className="text-accent-500" />
        </div>
    )
}

export default LoadingPage
