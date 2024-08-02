import { useState, useEffect, useRef } from 'react';
import { FaArrowDown, FaArrowUp, FaPause, FaPlay, FaSync } from 'react-icons/fa';
import './App.css'

function App() {
  const [blCount, setBlCount] = useState(5); //mins
  const [slCount, setSlCount] = useState(25); // minutes
  const [timeLeft, setTimeLeft] = useState(slCount * 60); //seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(slCount * 60);
  }, [slCount]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handlePlay = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(slCount * 60);
    setSlCount(25);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className='w-full h-screen bg-[#1e555c] flex items-start pt-6 justify-center'>
      <div className='flex flex-col items-center p-4 justify-center '>
        <h1 className='font-semibold text-4xl mb-6 font-Poppins text-white'>25 + 5 Clock</h1>
        <div className='flex justify-between gap-16'>
          <div>
            <h1 className='font-semibold text-white font-Poppins text-2xl mb-3'>Break length</h1>
            <div className='flex items-center justify-evenly'>
              <button onClick={() => setBlCount(precount => precount > 1 ? precount - 1 : precount)}>
                <i className='font-extrabold text-3xl text-white'><FaArrowDown /></i>
              </button>
              <h1 className='text-white font-bold text-xl'>{blCount}</h1>
              <button onClick={() => setBlCount(precount => precount >= 1 && precount < 60 ? precount + 1 : precount)}>
                <i className='font-extrabold text-3xl text-white'><FaArrowUp /></i>
              </button>
            </div>
          </div>
          <div>
            <h1 className='font-semibold text-2xl font-Poppins text-white mb-3'>Session length</h1>
            <div className='flex items-center justify-evenly'>
              <button onClick={() => setSlCount(precount => precount > 1 ? precount - 1 : precount)}>
                <i className='font-extrabold text-3xl text-white'><FaArrowDown /></i>
              </button>
              <h1 className='text-white font-bold text-xl'>{slCount}</h1>
              <button onClick={() => setSlCount(precount => precount >= 1 && precount < 60 ? precount + 1 : precount)}>
                <i className='font-extrabold text-3xl text-white'><FaArrowUp /></i>
              </button>
            </div>
          </div>
        </div>
        <div className='mt-5 border-[0.4rem] border-[#13353b] p-8 rounded-[3rem] flex items-center justify-center flex-col '>
          <h3 className='text-xl font-semibold text-white'>Session</h3>
          <div className='w-52 flex items-center justify-center'>
            <h1 className='font-semibold text-6xl text-white '>{formatTime(timeLeft)}</h1>
          </div>
        </div>
        <div className='flex items-center justify-center gap-5 mt-7'>
          <button onClick={handlePlay}>
            <i className='font-extrabold text-4xl text-white'><FaPlay /></i>
          </button>
          <button onClick={handlePause}>
            <i className='font-extrabold text-4xl text-white'><FaPause /></i>
          </button>
          <button onClick={handleReset}>
            <i className='font-extrabold text-4xl text-white'><FaSync /></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
