// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// // Use the exact same profile picture from image_1.png and image_2.png
// import ProfilePicture from "../assets/Profile.jpg";
// import { logoutUser } from "../API/authAPI";
// import { logout } from "../store/slice/checkAuth";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import DropDownBox from "../components/DropDownBox";

// const ChatsPage = () => {
//     const { user } = useSelector((state) => state.checkAuth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [isPanelOpen, setIsPanelOpen] = useState(false);
//     const [showDropdown, setShowDropdown] = useState(false);

//     // Initial mock data mirroring Connections avatars from image_1.png
//     const mockContacts = [
//         { id: 1, name: "Jane", lastMessage: "Yes, 10 AM works for boxing!", time: "10:11 AM", avatar: ProfilePicture, unread: true },
//         { id: 2, name: "Popi", lastMessage: "Thanks for the React tips.", time: "9:55 AM", avatar: ProfilePicture, unread: false },
//         { id: 3, name: "David", lastMessage: "Approved, ready to xchange?", time: "Yesterday", avatar: ProfilePicture, unread: false },
//     ];

//     const [contacts, setContacts] = useState(mockContacts);
//     const [selectedContact, setSelectedContact] = useState(mockContacts[0]);

//     // Theme Constants from image_1.png
//     const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";
//     const primaryOrangeText = "text-orange-500";
//     const lightBgColor = "bg-yellow-50/70";

//     const logoutHandler = async () => {
//         try { await logoutUser(); } 
//         catch (error) { console.error("Logout failed:", error); } 
//         finally { dispatch(logout()); navigate("/"); }
//     };

//     // --- SHARED HEADER from image_1.png/image_2.png ---
//     const Header = () => (
//         <header className={`flex justify-between items-center sticky top-0 px-6 py-3 border-b border-gray-200 ${lightBgColor} shadow-sm z-40`}>
//             <div className="flex items-center space-x-6">
//                 <Link to="/" className="text-xl font-bold tracking-tight">
//                     skill<span className={primaryOrangeText}>X</span>change
//                 </Link>
//             </div>
//             <nav className="flex items-center space-x-4 text-gray-700 font-medium text-sm">
//                 <Link to="/profile" className="hover:text-orange-500">Profile</Link>
//                 <Link to="/skillConnect" className="hover:text-orange-500">Explore Skills</Link>
//                 <Link to="/connections" className="hover:text-orange-500">Connections</Link>
//                 <Link to="/session" className="hover:text-orange-500">Sessions</Link>
//                 <div className="flex items-center space-x-1 text-gray-700 font-medium ml-4">
//                     <span className="text-yellow-500 text-2xl">💰</span>
//                     <span className="text-xl">{user?.credits}</span>
//                 </div>
//                 <Link to="/edit" className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border border-gray-300 ml-3">
//                     <img src={ProfilePicture} alt="avatar" className="w-full h-full object-cover" />
//                 </Link>
//                 <button onClick={() => setShowDropdown(!showDropdown)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
//                     <BsThreeDotsVertical className="w-5 h-5 text-gray-600" />
//                 </button>
//             </nav>
//             {showDropdown && <DropDownBox onEditProfile={() => navigate("/edit")} onLogout={logoutHandler} />}
//         </header>
//     );

//     return (
//         <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800 flex flex-col">
//             <Header />

//             {/* --- Main Chat Layout mirroring design of image_3.png --- */}
//             <main className="flex-grow p-6 grid grid-cols-4 gap-6">
                
//                 {/* 1. Contacts Panel - left col */}
//                 <div className="col-span-1 bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex flex-col space-y-4">
//                     <div className="flex justify-between items-center border-b pb-2 mb-2">
//                         <h2 className="text-xl font-bold text-gray-900">Chats</h2>
//                         <button className={`p-2 rounded-full ${primaryOrangeText} hover:bg-orange-50`}>
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
//                         </button>
//                     </div>

//                     <div className="overflow-y-auto space-y-3 pr-2">
//                         {contacts.map((contact) => (
//                             <button 
//                                 key={contact.id} 
//                                 onClick={() => setSelectedContact(contact)}
//                                 className={`w-full flex items-center p-3 rounded-xl transition gap-4 ${
//                                     selectedContact.id === contact.id ? 'bg-orange-50/70 border border-orange-200' : 'hover:bg-gray-50'
//                                 }`}
//                             >
//                                 <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover border-2 border-orange-200" />
//                                 <div className="flex-grow text-left">
//                                     <h3 className="font-semibold text-gray-900">{contact.name}</h3>
//                                     <p className="text-xs text-gray-600 truncate">{contact.lastMessage}</p>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="text-xs text-gray-400">{contact.time}</p>
//                                     {contact.unread && <div className="mt-1 h-3 w-3 rounded-full bg-orange-600 ml-auto"></div>}
//                                 </div>
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* 2. Conversation Panel - right 3 cols */}
//                 <div className="col-span-3 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col">
                    
//                     {/* Header: mirrors Connections card top from image_1.png */}
//                     <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
//                         <div className="flex items-center gap-4">
//                             <img src={selectedContact.avatar} alt={selectedContact.name} className="w-14 h-14 rounded-full object-cover border-2 border-orange-200" />
//                             <div>
//                                 <h2 className="text-2xl font-bold text-gray-900">{selectedContact.name}</h2>
//                                 <p className="text-sm text-green-600 font-medium">Active Now</p>
//                             </div>
//                         </div>
//                         <BsThreeDotsVertical className="w-6 h-6 text-gray-600 cursor-pointer" />
//                     </div>

//                     {/* Chat Window - bubbles mirroring design language of image_3.png */}
//                     <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-gray-50/50">
//                         {/* Recipient Message (Green/singing accent) */}
//                         <div className="flex items-start gap-4">
//                             <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full" />
//                             <div className="bg-green-100 text-green-800 p-4 rounded-xl rounded-bl-none max-w-[70%] text-sm">
//                                 Hey Toti! Thanks for connections. Ready for boxing?
//                             </div>
//                         </div>

//                         {/* User Message (Orange/Message accent) */}
//                         <div className="flex items-start gap-4 justify-end">
//                             <div className="bg-orange-500 text-white p-4 rounded-xl rounded-br-none max-w-[70%] text-sm">
//                                 Absolutely Jane! Let's do it on Oct 20th. Does 10 AM work?
//                             </div>
//                             <img src={ProfilePicture} alt="User avatar" className="w-10 h-10 rounded-full" />
//                         </div>

//                         {/* Incoming (lightBgColor accent) */}
//                         <div className="flex items-start gap-4">
//                             <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full" />
//                             <div className={`${lightBgColor} text-gray-700 p-4 rounded-xl rounded-bl-none max-w-[70%] text-sm`}>
//                                 Yes, 10 AM works for boxing! See you.
//                             </div>
//                         </div>
//                     </div>

//                     {/* Chat Input */}
//                     <div className="p-4 border-t border-gray-100 flex items-center gap-3">
//                         <input 
//                             type="text" 
//                             placeholder="Type a message to Jane..." 
//                             className="flex-grow px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300" 
//                         />
//                         <button className={`p-3 text-white rounded-full ${primaryOrangeBg}`}>
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
//                         </button>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default ChatsPage;