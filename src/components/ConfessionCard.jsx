import Image from "next/image"
import UserIcon from "../../public/usericon.jpg"

const ConfessionCard = ({ title, content, createdAt, name }) => {
    return (
        <div className='w-72 lg:w-80 p-5 rounded-lg border-solid border-2 border-orange-600 shadow-2xl flex flex-col gap-2'>
            <div className="flex gap-2 items-center ">
                <Image src={UserIcon} height={50} width={50} className="rounded-full" alt="usericon" />
                <div>
                    <p className="font-bold ">{name}</p>
                    {createdAt && <p className="text-xs font-bold text-slate-600">{createdAt}</p>}
                </div> 
            </div>
            <p className="font-bold">{title}</p>
            <div >
                {content}
            </div>
        </div>
    )
}

export default ConfessionCard