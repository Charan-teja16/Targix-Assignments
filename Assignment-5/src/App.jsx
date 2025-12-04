import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import 'antd/dist/reset.css'

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App

