import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Message from '../components/Message';
import { getMessageForTime } from '../utils/messages';
import MoodSelector from '../components/MoodSelector';
import { motion } from 'framer-motion';

export default function Home() {
    const [message, setMessage] = useState("");
    const [mood, setMood] = useState("");
    const moodMessages = {
        'Хорошо': '',
        'Нормально': '',
        'Грустно': '',
      };
      
    useEffect(() => {
        const savedMood = localStorage.getItem('olgaMood');
        if (savedMood) setMood(savedMood);
      }, []);
      
      const handleMoodSelect = (selectedMood) => {
        setMood(selectedMood);
        localStorage.setItem('olgaMood', selectedMood);
        setMessage(getMessageForTime(selectedMood)); 
      };
      
  
    return (
        
      <div className="container">
        
        <Header />
        
        <Message name="Мама" message={message} />
        <MoodSelector onSelectMood={handleMoodSelect} />
        <motion.div 
        className="mood-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        >
 {mood && (
  <p className="mood-message">
    {mood}. {moodMessages[mood]}
  </p>
)}
        </motion.div>
        <style jsx>{
        
        `
          .container {
            padding: 20px;
            
          }
          .mood-message {
            margin-top: 5px;
            font-size: 18px;
            color: #555;
            font-style: italic;
          }
          .mood-container {
            padding: 20px;
            text-align: center;
          }
          .mood-message {
                margin-top: 10px;
                font-size: 18px;
                color: #555;
                font-style: italic;
        }
        `}</style>
      </div>
    );
}