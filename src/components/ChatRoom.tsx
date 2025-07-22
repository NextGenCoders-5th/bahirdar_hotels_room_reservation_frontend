import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setMessages, addMessage } from '../redux/reducers/chat.slice';
import { ChatMessage } from '../types/chat.type';
import { socket } from '../socket/socket';
import clsx from 'clsx';
import { useAuthContext } from '@/context/AuthContext';
import LoadingPage from '@/pages/utils/LoadingPage';
import { useGetMyRoomsQuery } from '@/redux/api/messageApi';

const ChatRoom = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const messages = useSelector((state: RootState) => state.chat.messages);

  const { data: {data :{rooms} ={}} = {}, isLoading: messagesLoading } = useGetMyRoomsQuery();

  useEffect(() => {
    rooms?.forEach((room) => socket.emit('joinRoom', room.roomId));

    socket.on('message', (message: ChatMessage) => {
      dispatch(addMessage(message));
    });
    return () => {
      rooms?.forEach((room) => socket.emit('leaveRoom', room.roomId));
      socket.off('message');
    };
  }, [rooms]);



  const sendMessage = () => {
    if (!input.trim() || !activeRoom) return;

    const newMessage: ChatMessage = {
      roomId: activeRoom,
      sender: user?._id || 'unknown',
      text: input,
      timestamp: new Date().toISOString(),
    };

    socket.emit('sendMessage', newMessage);
    dispatch(addMessage(newMessage));
    setInput('');
  };

  const handleRoomChange = (roomId: string) => {
    setActiveRoom(roomId);
    socket.emit('joinRoom', roomId);
    socket.emit('getChatHistory', roomId);

    socket.once('chatHistory', (history: ChatMessage[]) => {
      console.log(`Chat history for room ${roomId}:`, history);
      dispatch(setMessages(history));
    });
  };

  if (messagesLoading ) {
    return <LoadingPage />;
  }


  if (!rooms || rooms.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No chat rooms available.</p>
      </div>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto shadow-lg border rounded-2xl bg-white h-[600px]">
      {/* Sidebar */}
      <pre>
      <div className="w-64 bg-gray-100 border-r rounded-l-2xl">
        <div className="p-4 font-semibold border-b text-lg bg-accent-50">Chat Rooms</div>
        <ul className="divide-y">
          {rooms?.map((room) => (
            <li
              key={room.roomId}
              className={clsx(
                'p-3 cursor-pointer hover:bg-accent-100 transition',
                activeRoom === room.roomId && 'bg-accent-200 font-medium'
              )}
              onClick={() => handleRoomChange(room.roomId)}
            >
              {(room.roomId || room.hotelId).slice(0, 20)}
            </li>
          ))}
        </ul>
      </div>

      </pre>
      

      {/* Chat Box */}
      <div className="flex flex-col flex-1">
        <div className="p-4 border-b text-lg font-semibold bg-accent-50 rounded-tr-2xl">
          Chat - {activeRoom || 'Select a Room'}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, i) => {
            const isCurrentUser = msg.sender === user?._id;
            return (
              <div
                key={i}
                className={clsx(
                  'flex flex-col max-w-[70%] text-sm',
                  isCurrentUser ? 'ml-auto items-end text-right' : 'items-start text-left'
                )}
              >
                <div
                  className={clsx(
                    'px-4 py-2 rounded-lg',
                    isCurrentUser ? 'bg-accent-500 text-white' : 'bg-white border'
                  )}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  {isCurrentUser ? 'You' : msg.sender} ·{' '}
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-500"
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-accent-600 text-white px-4 py-2 rounded-full hover:bg-accent-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
