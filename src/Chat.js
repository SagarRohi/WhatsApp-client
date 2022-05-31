import { useSelector,useDispatch } from "react-redux";
import { useRef ,useEffect,useState} from "react";
import axios from 'axios';
import { setWantToChat,setActiveMessages,addActiveMessage,setUser, setActiveChat } from "./reducer";
import Message from './Message';
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var socket=null;
const Chat=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [showMenu,setShowMenu]=useState(false);
    const activeUser=useSelector(state=>state.activeChat);
    const messages=useSelector(state=>state.activeMessages);
    const wantToChat=useSelector((state)=>state.wantToChat);
    const  me=useSelector(state=>state.user);
    const messageRef=useRef();

    const notify = (message) => toast(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    const notifySuccess = (message) => toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

    //for socket event...(realtime)
   useEffect(()=>{
    if(!socket) socket=io('https://whatsgoingclone.herokuapp.com/');
    return ()=>{
        socket.off();
    }
   },[])

    useEffect(()=>{
      const id=me?._id;
      const phone=me?.phone;
      const activeUserPhone=activeUser?.phone;
      const updateEvent=`update_${id}`;
      const messageEvent=`message_${id}`;
      const addedYouEvent=`addedYou_${phone}`;
      const addedByEvent=`addedBy_${phone}`;
      socket.on(updateEvent,(data)=>{
          const {user}=data;
          dispatch(setUser(user));
      })
      socket.on(addedYouEvent,(data)=>{
        notify(`${data.username} added you`);
      })
      socket.on(addedByEvent,(data)=>{
        dispatch(setActiveChat(data));
        notifySuccess(`${data.username} added successfully`,);
      })
      socket.on(messageEvent,(data)=>{
          const senderPhone=data.sender.phone;
          if(senderPhone===me.phone||senderPhone===activeUser.phone) dispatch(addActiveMessage(data));
          else notify(`new messages from ${data.sender.username}`);
      })
     
       const deletedYouEvent=`deletedYou_${phone}`;
       socket.on(deletedYouEvent,({you,deleter})=>{
          if(deleter.phone===activeUserPhone){
            const myContacts=you.contacts;
            if(myContacts.length>0){
              dispatch(setActiveChat(myContacts[0]));
              dispatch(setWantToChat(false));
            }
            else {
              dispatch(setActiveChat(null));
              dispatch(setWantToChat(false));
            }
          }
          notifySuccess(`${deleter.username} Has Removed You`);
       });

       const deletedByEvent=`deletedBy_${phone}`;
       socket.on(deletedByEvent,({you,deleted})=>{
             if(you.contacts.length>0){
               console.log("by after deleting ||| you     ",you);
              dispatch(setActiveChat(you.contacts[0]));
              dispatch(setWantToChat(false));
             }
             else {
              dispatch(setActiveChat(null));
              dispatch(setWantToChat(false));
             }
             notifySuccess(`${deleted.username} Has Removed Successfully`);
       })

      return ()=>{socket.off();}
 },[me,activeUser]);

//...................................................................

    // For Feteching The messages of sender and receiver.............
    useEffect(()=>{
        if(activeUser) axios.get(`https://whatsgoingclone.herokuapp.com/message/?sender=${activeUser._id}&&receiver=${me._id}`).then((response)=>{
            if(response.data) dispatch(setActiveMessages(response.data.messages));
        })
    },[activeUser])


    // For Scroll To Bottom.....
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
      scrollToBottom()
    }, [messages]);


    // For sending the message .....
    const handleClick=()=>{
            const content=messageRef.current.value;
            if(content.length==0) return;
            const message={
                content,
                sender:me._id,
                receiver:activeUser._id,
            }
            axios.post('https://whatsgoingclone.herokuapp.com/message/create',message).then((response)=>{
               messageRef.current.value="";
            })
    }
//.....................................................
 //logout functionality.........
    const logOut=()=>{
      localStorage.removeItem('user');
      dispatch(setUser(null));
      dispatch(setActiveChat(null));
      dispatch(setActiveMessages([]));
      navigate('/')
    }

     //............delete the contact from contactList................

     const deleteContact=()=>{
       axios.post('https://whatsgoingclone.herokuapp.com/user/delete',{
         sender:me._id,
         receiver:activeUser._id,
       })
     }
    if(!activeUser) return <div className="hidden sm:flex border-l-2 border-gray-400 flex-col w-full ">
        <div className="p-1 border-l-gray-300 border-l-2  border-green-800 border-b-2 bg-white flex gap-4 items-center ">
            <img src='./images/newtop.svg' alt="avatar" className=" h-12 object-cover rounded-full "/>
            <button onClick={logOut} className=" px-6 py-2 hidden sm:block ml-auto mr-2
             text-white bg-green-600 shadow-lg rounded tracking-wider">LogOut</button>
          </div>
      <img src='/images/new.svg' alt='home' className="w-96 h-96 self-center  "/>
    </div>
    return <div className={`${activeUser&&wantToChat?"":"hidden"} flex sm:flex h-full flex-1 flex-col bg-chat  sm:border-r-8 border-2 border-white`}>

          <div className="p-1 border-l-gray-300 border-l-2  border-green-800 border-b-2 bg-white flex gap-4 items-center">
            <img src='./images/avatar.webp' alt="avatar" className=" h-12 object-cover rounded-full"/>
            <div>
            <p className=" text-xl border-b-2 border-white hover:border-gray-500">{activeUser?.username}</p>
            <p className='text-md opacity-50'>{activeUser?.phone}</p>
            </div>
           <div className="ml-auto flex gap-2">
           <button onClick={()=>dispatch(setWantToChat(false))} className=" hidden  px-6 py-2 
             text-white bg-green-600 shadow-lg rounded tracking-wider">Exit</button>
             <button onClick={deleteContact} className=" px-6 py-2 hidden sm:block
             text-white bg-red-800 shadow-lg rounded tracking-wider">Remove</button>
            <button onClick={logOut} className=" px-6 py-2 hidden sm:block
             text-white bg-green-600 shadow-lg rounded tracking-wider">LogOut</button>
             <img onClick={()=>setShowMenu(!showMenu)} src='/images/three-dots.svg' className=" sm:hidden rotate-180 w-8" alt='dots'/>
             {showMenu&&<div className="shadow-lg shadow-gray-500 rounded fixed right-8 top-12 bg-white">
               <p onClick={()=>{
                 dispatch(setWantToChat(false));
                 setShowMenu(false);
               }} className="px-8 py-4 border-b-2 border-gray-500 font-light tracking-wider text-green-500 ">Exit</p>
               <p onClick={()=>{
                 deleteContact();
                 setShowMenu(false);
               }} className="px-8 py-4 font-light tracking-wider text-red-500">Remove</p>
             </div>}
           </div>
            
         <ToastContainer />
          </div>
         <div className="overflow-y-auto scrollbar-hide grow">
             
                {messages.map((message,id)=>{
                      let sender=false;
                      if(message.sender._id===me._id) sender=true;
                      return <Message message={message} sender={sender}key={id} />
                  })}
                  <div ref={messagesEndRef} />
         </div>

              <div className=" flex bg-home w-full p-2 gap-2">
                  <div className="flex gap-2 flex-1 bg-white p-2 rounded">
                  <img src='/images/emoji.png' alt='send' className="w-6 object-contain cursor-pointer"/>
                  <input ref={messageRef} type='text' placeholder="Type a Message" className=" flex-1 outline-none  rounded"/>
                  <img onClick={handleClick} src='/images/send.png' alt='send' className="w-6 object-contain cursor-pointer"/>
                  </div>
              </div>
    </div>
}

export default Chat;