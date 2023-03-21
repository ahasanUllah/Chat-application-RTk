import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Test = () => {
   const [date, setDate] = useState(new Date());
   const tick = () => {
      console.log('clock ticking');
      setDate(new Date());
   };

   useEffect(() => {
      console.log('start');
      const interval = setInterval(tick, 1000);
      return () => {
         console.log('component unmount');
         return clearInterval(interval);
      };
   }, []);

   return (
      <div>
         <h2>Helolo</h2>
         <h2>{date.toLocaleTimeString()}</h2>
         <Link to="/">Home</Link>
      </div>
   );
};

export default Test;
