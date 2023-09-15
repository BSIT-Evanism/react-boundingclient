import { useRef, useState } from 'react'
import './main.css'
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { createContext, useContext } from 'react';

const mouseHover = createContext()
const changeHover = createContext()
const objCoords = createContext()
const settingCoords = createContext()

export const HoverMouse = ({ children }) => {
  const [hover, setHover] = useState(false)
  const [coords, getCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log(hover)
  }, [hover])

  return (
    <objCoords.Provider value={coords}>
      <settingCoords.Provider value={getCoords}>
        <mouseHover.Provider value={hover}>
          <changeHover.Provider value={setHover}>
            {children}
          </changeHover.Provider>
        </mouseHover.Provider>
      </settingCoords.Provider>
    </objCoords.Provider>
  )
}


const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const hover = useContext(mouseHover);
  const { x, y } = useContext(objCoords)

  const mousePos = (e) => {
    const { clientX, clientY } = e;
    const xPos = clientX - 20 / 2;
    const yPos = clientY - 20 / 2;
    setPosition({ x: xPos, y: yPos })
  }

  useEffect(() => {
    window.addEventListener('mousemove', mousePos)

  }, [])



  return (
    <motion.div
      className='cursor'
      animate={hover ? { x: x, y: y, scale: 3 } : { x: position.x, y: position.y, scale: 0.9 }}

    ></motion.div>
  )
}

const Hover = () => {
  const ref = useRef(null);
  const setCoords = useContext(settingCoords);
  const setHover = useContext(changeHover);
  const hover = useContext(mouseHover)



  useEffect(() => {
    const { x, y, top, left, width, height } = ref.current.getBoundingClientRect();
    const centerX = (left + width / 2) - 10;
    const centerY = (top + height / 2) - 10;
    console.log(x, y)
    setCoords({ x: centerX, y: centerY })
  }, [setCoords])



  return (
    <>

      <div className={hover ? 'hoverObject changeHover' : 'hoverObject'} onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        ref={ref}></div>
    </>
  )
}

function App() {
  return (
    <>
      <HoverMouse>
        <Cursor />
        <div className='wrapper'>
          <Hover />
        </div>
      </HoverMouse>
    </>
  );
}

export default App;
