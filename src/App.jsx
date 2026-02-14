import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Feed from "./components/Feed"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import Premium from "./components/Premium"
import Chat from "./components/Chat"
import Landing from "./components/Landing"
import ProtectedRoute from "./components/ProtectedRoute"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing/>}/> 
      <Route path="/login" element={<Login/>}/> 
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Body/>
        </ProtectedRoute>
      }> 
        <Route path="/feed" element={<Feed/>}/> 
        <Route path="/profile" element={<Profile/>}/> 
        <Route path="/connections" element={<Connections/>}/> 
        <Route path="/requests" element={<Requests/>}/> 
        <Route path="/premium" element={<Premium/>}/> 
        <Route path="/chat/:targetUserId" element={<Chat />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App