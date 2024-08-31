import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import AppLayout from './layouts/AppLayout'
import Landing from './pages/Landing'
import Job from './pages/Job'
import PostJob from './pages/PostJob'
import JobListing from './pages/JobListing'
import Onboarding from './pages/Onboarding'
import SavedJobs from './pages/SavedJobs'
import MyJobs from './pages/MyJobs'
import { ThemeProvider } from './components/ThemeProvider'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
const router = createBrowserRouter([
  {
    element:<AppLayout />,
    children:[
      {
        path:"/",
        element:<Landing />
      },
      {
        path:"/onboarding",
        element:
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
      },
      {
        path:"/jobs",
        element:
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
      },
      {
        path:"/job/:id",
        element:
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
      },
      {
        path:"/post-job",
        element:
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
      },
      {
        path:"/saved-job",
        element:
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
      },
      {
        path:"/my-jobs",
        element:
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
      },
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
