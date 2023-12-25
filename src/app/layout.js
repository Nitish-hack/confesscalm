import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Confess Calm',
  description: 'Share Secrets anonymously',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className='container'>

              <Navbar />
              {children}
            </div>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={5000} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
