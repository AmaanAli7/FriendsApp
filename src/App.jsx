import { useState } from "react";
import Confetti from "react-confetti";

function App() {

  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 100, y: 100 });
  const [yesScale, setYesScale] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const funnySound = new Audio(
    "https://www.myinstants.com/media/sounds/cartoon-boing.mp3"
  );

  const messages = [
    "Are you sure? 🥺",
    "Ohh Plzz",
    "Think again 😭",
    "Please don't say no 💔",
    "You can't escape friendship 😈",
    "Friendship is loading... don't cancel 😤",
    "Hey! That No button is not for you 😑",
    "Come on… just press Yes 😭",
    "My feelings are buffering 💔",
    "System warning: Saying No may cause sadness 😢",
    "Last chance... friendship awaits 😌",
  ];

  const teleportNo = () => {

    funnySound.play();

    setAttempts((a) => a + 1);
    setYesScale((s) => s + 0.15);

    setLoading(true);

    setTimeout(() => {

      const maxX = window.innerWidth - 120;
      const maxY = window.innerHeight - 120;

      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;

      setNoPosition({ x: newX, y: newY });
      setLoading(false);

    }, 500);

    setMessageIndex((i) => Math.min(i + 1, messages.length - 1));
  };

  const handleYes = () => {
    setAccepted(true);
  };

  const shareWhatsApp = () => {

    const text = "Hey! Try this funny friendship test 😂";
    const url = window.location.href;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`
    );
  };

  if (accepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center p-6">

        <Confetti />

        <h1 className="text-3xl font-bold mb-4">
          YAY! We're friends now 🥰
        </h1>

        <img
          src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
          className="w-56 rounded-lg mb-4"
        />

        <img
          src="https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif"
          className="w-56 rounded-lg"
        />

        <button
          onClick={shareWhatsApp}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Share on WhatsApp 📤
        </button>

      </div>
    );
  }

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center p-6">

      <h1 className="text-2xl md:text-3xl font-bold mb-3">
        Will you be my friend Zoya ? 🥹
      </h1>

      <p className="mb-10 text-lg">
        {messages[messageIndex]}
      </p>

      {/* {loading && (
        <p className="mb-4 text-orange-600 font-medium">
          Thinking if No is allowed... 🤔
        </p>
      )} */}

      <div className="flex gap-6 items-center">

        {/* YES BUTTON */}

        <button
          onClick={handleYes}
          style={{ transform: `scale(${yesScale})` }}
          className="bg-green-500 text-white px-5 py-3 rounded-xl transition"
        >
          Yes ❤️
        </button>

        {/* NO BUTTON */}

        <button
          onMouseEnter={teleportNo}
          onClick={
            messageIndex === messages.length - 1
              ? handleYes
              : teleportNo
          }
          style={{
            position: "absolute",
            left: noPosition.x,
            top: noPosition.y,
          }}
          className={`text-white px-5 py-3 rounded-xl ${
            messageIndex === messages.length - 1
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {messageIndex === messages.length - 1 ? "Yes 😅" : "No 😈"}
        </button>

      </div>

      {/* <p className="mt-10 text-sm text-gray-600">
        Attempts to say No: {attempts}
      </p> */}

    </div>
  );
}

export default App;