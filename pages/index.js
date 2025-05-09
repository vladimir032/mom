import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Message from '../components/Message';
import { getMessageForTime } from '../utils/messages';
import MoodSelector from '../components/MoodSelector';
import { motion } from 'framer-motion';

export default function Home() {
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("");
  const [currentBackground, setCurrentBackground] = useState('happy-bg');
  const [isClient, setIsClient] = useState(false);

  const moodMessages = {
    'Хорошо': '',
    'Нормально': '',
    'Грустно': '',
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const savedMood = localStorage.getItem('olgaMood');
    if (savedMood) {
      setMood(savedMood);
      updateBackground(savedMood);
    }
  }, []);

  const updateBackground = (selectedMood) => {
    const newBackground =
      selectedMood === 'Хорошо'
        ? 'happy-bg'
        : selectedMood === 'Нормально'
        ? 'neutral-bg'
        : 'sad-bg';

    setCurrentBackground(newBackground);
  };

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    updateBackground(selectedMood);
    setMessage(getMessageForTime(selectedMood));
    localStorage.setItem('olgaMood', selectedMood);
  };

  return (
    <div className="container">
      {isClient && (
        <>
          <div className={`background-layer ${currentBackground}`}></div>
        </>
      )}
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
      <style jsx>{`
        .container {
          padding: 20px;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .background-layer {
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 1;
          transition: opacity 5s ease;
        }

        .happy-bg {
          background: linear-gradient(to right, #f6d365, #fda085);
        }

        .neutral-bg {
          background: linear-gradient(to right, #cfd9df, #e2ebf0);
        }

        .sad-bg {
          background: linear-gradient(to right, #a1c4fd, #c2e9fb);
        }
      `}</style>
    </div>
  );
}
