import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router";
import MainPages from "./pages/MainPages.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import Header from "./components/Header.jsx";
import MonthlyAveragePage from "./pages/MonthlyAveragePage.jsx";
import WeatherChartPage from "./pages/WeatherChartPage.jsx";

function App() {

  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPages />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/stats-average" element={<MonthlyAveragePage />} />
          <Route path="/stats-chart" element={<WeatherChartPage />} />
        </Routes>
      </div>
  )
}

export default App
