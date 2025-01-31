import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react'; // Three dots icon
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useAuth } from './AuthContext';

function UserCard(props) {

  // const [lastMessage, setLastMessage]=useState(null)


  // const [isMessageSeen, setIsMessageSeen] = useState(false); // Track if message is seen

  const userObject = props.userObject;
  const params = useParams();
  const isActive = params?.chatid === userObject.id;
  const lastMessage=props?.lastMessage?.text || ""
  const time=props.lastMessage?.time || ""

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);


  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false); // Close the menu if clicked outside
      }
    };

    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]); // Dependency on `showMenu`

  const handleDeleteUser = async () => {
    try {
      // Delete the user from the Firebase 'users' collection
      await deleteDoc(doc(db, 'users', userObject.id));
      // Call the parent component's onDelete callback to update the UI
      props.onDelete(userObject.id);
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  // Function to format the timestamp into a readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  
  return (
    <div className="relative mb-4">
      {/* User Card Link */}
      <Link
        className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-200 ${isActive && "bg-gray-200"}`}
        to={`/${userObject.id}`}
      >
        <img
          src={userObject.userData.profile}
          alt={userObject.userData.name}
          className='h-12 w-12 object-cover rounded-full'
        />
        <div className="flex flex-col w-full">
          <h2 className="text-lg font-semibold">{userObject.userData.name}</h2>
          <div className="flex justify-between items-center w-full">
              {/* Only show last message and time if the current user is the receiver */}

              {!isActive && (
                <>
                  <p className="text-sm text-gray-500 truncate max-w-[200px]">{lastMessage}</p>
                  <span className="text-xs text-gray-400 absolute right-8">{time}</span>
                </>
              )}
              
          </div>
        </div>
        
        
      </Link>

      {/* Three dots menu */}
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={(e) => {  
          e.stopPropagation(); // Prevent the click event from propagating to the document
          setShowMenu(!showMenu);
        }}
      >
        <EllipsisVertical className="text-gray-600" size={20} />
      </div>
      
      {/* Dropdown Menu */}
      {showMenu && (
        <div ref={menuRef} className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-2 w-40 z-10">
         <button
              onClick={handleDeleteUser}
              className="text-red-600 border-2 border-red-600 hover:bg-gray-100 w-full text-left py-2 px-4 rounded-md transition-all duration-200"
          >
              Delete User
          </button>
        </div>
      )}
    </div>
  );
}

export default UserCard;
