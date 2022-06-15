
const getTime=(data)=>{
    const date=data.getDate();
    const month=data.getMonth();
    const year=data.getFullYear();
    return `${date}/${month}/${year}`
}

const Message=({message,sender})=>{
    const {content}=message;
    const time=getTime(new Date(message.createdAt));
    return <div className={`relative pb-2 mt-2 mb-4 ${sender?"mr-2":"ml-2"}`}>
        <div className={`text-black ${sender?"bg-whatsapp ml-auto":"bg-white ml-0"} mt-0 w-max max-w-xs lg:max-w-lg break-words px-2 py-1 rounded-lg mb-2`}>
        {content}
      </div>
        <p className={`absolute bottom-0 ${sender?"right-0":"left-0"}  text-xs font-extraligh`}>{time}</p>
      </div>
}

export default Message;