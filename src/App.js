import Calendar from "./component/calendar/Calendar";
import Detail from "./component/Detail";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          {/* path경로에 따라 다른 컴포넌트 호출 */}
          <Route path="/" element={<Calendar />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;