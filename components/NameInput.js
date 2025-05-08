import { useState, useEffect } from 'react';

export default function NameInput({ onSetName }) {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) onSetName(storedName);
  }, []);

  const saveName = () => {
    localStorage.setItem("username", name);
    onSetName(name);
  };

  return (
    <div>
      <input
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={saveName}>Сохранить</button>
    </div>
  );
}
