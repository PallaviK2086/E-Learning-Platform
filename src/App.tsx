import { Route, Routes, Navigate } from "react-router-dom";
import Lessons from "./pages/Lessons.tsx";
import LessonDetail from "./pages/LessonDetails.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Lessons />} />
      <Route path="/lesson/:id" element={<LessonDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
