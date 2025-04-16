// Minimalist Messaging App with Extended Features

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, Users, Moon, Sun, Settings, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const mockGroups = [
  { name: 'Study Group', id: 1 },
  { name: 'Hackathon Team', id: 2 },
  { name: 'Friends', id: 3 },
];

const mockMessages = {
  1: [
    { id: 1, sender: 'Alice', content: 'Hey team!', avatar: '🧑‍🎓' },
    { id: 2, sender: 'Bob', content: 'Ready for tomorrow?', avatar: '👨‍💻' },
  ],
  2: [
    { id: 1, sender: 'Dev', content: 'Update the repo please!', avatar: '👨‍🔧' }
  ],
  3: [
    { id: 1, sender: 'Sam', content: 'Let’s hang out this weekend.', avatar: '🎉' }
  ]
};

export default function MessagingApp() {
  const [groupId, setGroupId] = useState(1);
  const [messages, setMessages] = useState(mockMessages[groupId]);
  const [newMessage, setNewMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [typing, setTyping] = useState(false);
  const [pinnedMessage, setPinnedMessage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const fakeMessage = {
        id: Date.now(),
        sender: 'Bot',
        content: 'This is a simulated real-time message.',
        avatar: '🤖'
      };
      setMessages(prev => [...prev, fakeMessage]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessages(mockMessages[groupId] || []);
    setPinnedMessage(null);
  }, [groupId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const msg = { id: Date.now(), sender: 'You', content: newMessage, avatar: '🙋‍♂️' };
      setMessages([...messages, msg]);
      setNewMessage('');
    }
  };

  const attachMedia = () => {
    const fakeMedia = {
      id: Date.now(),
      sender: 'You',
      content: '[Photo] 🖼️ You shared a media file.',
      avatar: '🙋‍♂️'
    };
    setMessages([...messages, fakeMedia]);
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setTyping(true);
    setTimeout(() => setTyping(false), 1500);
  };

  const pinMessage = (msg) => {
    setPinnedMessage(msg);
  };

  return (
    <motion.div className={\`min-h-screen flex flex-col items-center justify-start p-4 pt-20 transition-all \${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}\`}>
      <div className="absolute top-4 right-4 flex gap-2">
        <Button variant="ghost" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun /> : <Moon />}
        </Button>
        <Button variant="ghost" onClick={() => setNotificationsEnabled(!notificationsEnabled)}>
          <Bell className={\`\${notificationsEnabled ? '' : 'opacity-50'}\`} />
        </Button>
        <Button variant="ghost">
          <Settings />
        </Button>
      </div>

      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">📨 Message Tracker</h1>
        <p className="text-sm text-gray-500">Total messages: {messages.length}</p>
      </div>

      {pinnedMessage && (
        <div className="mb-4 px-4 py-2 bg-yellow-200 rounded-lg w-full max-w-md">
          <p className="text-sm font-semibold">📌 Pinned:</p>
          <p className="text-sm">{pinnedMessage.content}</p>
        </div>
      )}

      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <select
              value={groupId}
              onChange={(e) => setGroupId(Number(e.target.value))}
              className="text-lg font-bold bg-transparent border-none focus:outline-none"
            >
              {mockGroups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
            <Users className="text-gray-500" />
          </div>

          <div className="h-72 overflow-y-auto space-y-2 mb-4">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className={\`p-2 rounded-lg max-w-xs cursor-pointer \${msg.sender === 'You' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-gray-800'}\`}
                onDoubleClick={() => pinMessage(msg)}
              >
                <p className="text-sm font-semibold">{msg.avatar} {msg.sender}</p>
                <p>{msg.content}</p>
              </motion.div>
            ))}
          </div>

          {typing && <p className="text-xs text-gray-500 mb-2">Someone is typing...</p>}

          <div className="flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={handleTyping}
              className="flex-1"
            />
            <Button onClick={sendMessage}><Send className="w-4 h-4" /></Button>
            <Button variant="ghost" onClick={attachMedia}><Paperclip className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
