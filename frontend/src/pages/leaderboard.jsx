// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// // Use the exact same profile picture from image_1.png and image_2.png
// import ProfilePicture from "../assets/Profile.jpg";
// import { logoutUser } from "../API/authAPI";
// import { logout } from "../store/slice/checkAuth";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import DropDownBox from "../components/DropDownBox";

// const LeaderboardPage = () => {
//     const { user } = useSelector((state) => state.checkAuth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [showDropdown, setShowDropdown] = useState(false);

//     // PAGINATION STATE
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5; // How many ranks to show inside the white card

//     // Mock data strictly mirroring existing participants (Popi, Toti, Jane, etc.)
//     const [rankData] = useState([
//         { id: 1, name: "Popi", teaching: ["React"], learning: ["singing"], rating: 4.9, credits: 120, avatar: ProfilePicture },
//         { id: 2, name: "Jane", teaching: ["Boxing"], learning: ["Vite"], rating: 4.7, credits: 85, avatar: ProfilePicture },
//         { id: 3, name: "David", teaching: ["Dancing"], learning: ["React"], rating: 4.5, credits: 60, avatar: ProfilePicture },
//         { id: 4, name: "toti", teaching: ["dancing"], learning: ["react"], rating: 4.2, credits: 49.5, avatar: ProfilePicture, isCurrentUser: true }, // Updated rating from image_6.png
//         { id: 5, name: "Mayliche", teaching: ["Boxing"], learning: ["React"], rating: 2.8, credits: 30, avatar: ProfilePicture },
//         // Expanded list for pagination demo
//         { id: 6, name: "Michael", teaching: ["Docker"], learning: ["AWS"], rating: 2.5, credits: 25, avatar: ProfilePicture },
//         { id: 7, name: "Sarah", teaching: ["UI Design"], learning: ["Figma"], rating: 2.4, credits: 20, avatar: ProfilePicture },
//         { id: 8, name: "Chris", teaching: ["Node.js"], learning: ["Typescript"], rating: 2.3, credits: 15, avatar: ProfilePicture },
//     ]);

//     // Theme Constants from established UI
//     const primaryOrangeText = "text-orange-500";
//     const lightBgColor = "bg-yellow-50/70";

//     const logoutHandler = async () => {
//         try { await logoutUser(); } 
//         catch (error) { console.error("Logout failed:", error); } 
//         finally { dispatch(logout()); navigate("/"); }
//     };

//     // --- SHARED HEADER from established UI ---
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

//     // --- PAGINATION LOGIC ---
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentRanks = rankData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(rankData.length / itemsPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800 flex flex-col">
//             <Header />

//             <main className="flex-grow p-8 max-w-6xl mx-auto w-full">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-8">Leaderboard</h1>

//                 {/* --- Themed Card mirroring design of image_1.png/image_6.png --- */}
//                 <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-100">
//                                 <th className="px-8 py-4 font-semibold">Rank</th>
//                                 <th className="px-6 py-4 font-semibold">Username</th>
//                                 <th className="px-6 py-4 font-semibold">Teaching</th>
//                                 <th className="px-6 py-4 font-semibold">Learning</th>
//                                 <th className="px-8 py-4 font-semibold text-right">Average Rating</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-100">
//                             {currentRanks.map((row, index) => {
//                                 // Calculate actual rank based on pagination
//                                 const actualRank = indexOfFirstItem + index + 1;
//                                 return (
//                                     <tr 
//                                         key={row.id} 
//                                         className={`transition-colors ${row.isCurrentUser ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
//                                     >
//                                         <td className="px-8 py-5">
//                                             <span className={`text-xl font-bold ${actualRank <= 3 ? 'text-green-600' : 'text-blue-500'}`}>
//                                                 {actualRank}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-5">
//                                             <div className="flex items-center gap-4">
//                                                 <img src={row.avatar} alt={row.name} className="w-10 h-10 rounded-full border border-orange-200 shadow-sm" />
//                                                 <span className="font-bold text-gray-900 text-lg">{row.name}</span>
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-5">
//                                             <div className="flex gap-2">
//                                                 {row.teaching.map(s => (
//                                                     <span key={s} className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold capitalize">
//                                                         {s}
//                                                     </span>
//                                                 ))}
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-5">
//                                             <div className="flex gap-2">
//                                                 {row.learning.map(s => (
//                                                     <span key={s} className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold capitalize">
//                                                         {s}
//                                                     </span>
//                                                 ))}
//                                             </div>
//                                         </td>
//                                         <td className="px-8 py-5 text-right">
//                                             <div className="flex items-center justify-end gap-2 text-2xl font-bold text-gray-900">
//                                                 {row.rating.toFixed(1)}
//                                                 <span className="text-yellow-400 text-xl">★</span>
//                                             </div>
//                                             <p className="text-xs text-gray-400 font-medium">💰 {row.credits} Credits</p>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* --- PAGINATION CONTROLS placed below the main card --- */}
//                 <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3 rounded-xl shadow-sm">
//                     <div className="flex flex-1 justify-between sm:hidden">
//                         <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
//                         <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
//                     </div>
//                     <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//                         <div>
//                             <p className="text-sm text-gray-700">
//                                 Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{indexOfLastItem > rankData.length ? rankData.length : indexOfLastItem}</span> of <span className="font-semibold">{rankData.length}</span> results
//                             </p>
//                         </div>
//                         <div>
//                             <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//                                 <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50">
//                                     <span className="sr-only">Previous</span>
//                                     {/* IconTimes SVG for Previous */}
//                                     <svg className="h-5 w-5" viewBox="0 0 384 512" fill="currentColor"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L247.3 256 342.6 150.6z"></path></svg>
//                                 </button>
//                                 {[...Array(totalPages)].map((_, i) => (
//                                     <button
//                                         key={i + 1}
//                                         onClick={() => paginate(i + 1)}
//                                         aria-current={currentPage === i + 1 ? "page" : undefined}
//                                         className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 ${currentPage === i + 1 ? 'z-10 bg-orange-600 text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-600' : 'text-gray-900 hover:bg-gray-50'}`}
//                                     >
//                                         {i + 1}
//                                     </button>
//                                 ))}
//                                 <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50">
//                                     <span className="sr-only">Next</span>
//                                     {/* IconPlusCircle SVG for Next */}
//                                     <svg className="h-5 w-5" viewBox="0 0 512 512" fill="currentColor"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg>
//                                 </button>
//                             </nav>
//                         </div>
//                     </div>
//                 </div>

//             </main>
//         </div>
//     );
// };

// export default LeaderboardPage;