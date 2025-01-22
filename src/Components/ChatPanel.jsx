import React, { useEffect, useState } from 'react';
import { db } from '../../firebase.config';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { ArrowLeft, CircleFadingPlusIcon, Loader2Icon, MessageSquare, SearchIcon, UserRoundIcon } from 'lucide-react';
import Profile from './Profile';
import UserCard from './UserCard';
import { useAuth } from './AuthContext';

function ChatPanel() {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [profile, showProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [lastMessages, setLastMessages] = useState({});

  const { userData } = useAuth();

  let filterUsers = users;
  if (searchQuery) {
    filterUsers = users.filter((user) => user.userData.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
  }

  const onBack = () => { showProfile(false); }

  useEffect(() => {
    const getUsers = async () => {
      // Fetch users from Firebase
      const snapShot = await getDocs(collection(db, 'users'));
      const arrayOfUser = snapShot.docs.map((docs) => { return { userData: docs.data(), id: docs.id } });
      setUsers(arrayOfUser);
      setLoading(false);
    };

    // Fetch last message for each user
  const fetchLastMessages = () => {
    users.forEach(user => {
      const chatRef = doc(db, 'user-chats', user.id); // Assuming 'user-chats' is the collection
      onSnapshot(chatRef, (snapshot) => {
        const messages = snapshot.data()?.messages || [];
        if (messages.length > 0) {
          const lastMessage = messages[messages.length - 1]; // Get the last message
          setLastMessages(prevMessages => ({
            ...prevMessages,
            [user.id]: {
              text: lastMessage.text,
              time: lastMessage.time,
            },
          }));
        }
      });
    });
  };

    getUsers();
    fetchLastMessages();
  }, [users]);


  
  


  // Handle user deletion in ChatPanel
  const handleDeleteUser = (userId) => {
    // Remove deleted user from the `users` state
    setUsers(users.filter(user => user.id !== userId));
  };

  if (isLoading) {
    return (
      <div>....Loading</div>
    );
  }

  if (profile === true) {
    return (
      <Profile onBack={onBack} />
    );
  }

  const currentUser = users.find((user) => user.userData?.email === userData?.email);

  return (
    <div className='bg-white w-[30vw] min-w-[350px]'> 
      {/* //Top Bar */}
      <div className='bg-backGround py-2 px-4 border-r flex justify-between items-center gap-2'>
        <button onClick={() => { showProfile(true); }}>
          {currentUser?.userData?.profile ? (
            <img 
              src={currentUser.userData.profile}
              alt="profile picture"
              className='w-10 h-10 rounded-full object cover'
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200">No Image</div>
          )}
        </button>
        <div className='flex item-end justify-center cursor-pointer gap-6 mx-4'>
          <CircleFadingPlusIcon className='w-6 h-6' />
          <MessageSquare className='w-6 h-6' />
          <UserRoundIcon className='w-6 h-6' />
        </div>
      </div>

      {/* Chat List */}
      {isLoading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <Loader2Icon className='w-10 h-10 animate-spin' />
        </div>
      ) : (
        <div className='bg-white py-2 px-3'>
          <div className='bg-backGround flex items-center gap-4 px-3 py-2 rounded-lg'>
            <SearchIcon className='w-4 h-4' />
            <input
              className='bg-backGround focus-within:outline-none'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='divide-y py-4 h-full max-h-[calc(100vh-152px)] overflow-y-auto'> 
            {filterUsers.map(userObject => (
              <UserCard 
                userObject={userObject} 
                key={userObject.id} 
                lastMessage={lastMessages[userObject.id]} // Pass the last message to UserCard
                onDelete={handleDeleteUser} // Pass onDelete function to UserCard
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPanel;
