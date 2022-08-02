import Calendar from "./Calendar";
import Detail from "./Detail";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [todayDate, setsTodayDate] = useState(new Date());
  return (
    <div >
      <BrowserRouter>
        <Routes>
          {/* path경로에 따라 다른 컴포넌트 호출 */}
          <Route path="/" element={<Calendar />}></Route>
          <Route path="/detail/:id" element={<Detail 
            currentMonth={currentMonth}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;