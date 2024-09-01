import Header from '@/components/blocks/Header'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Movies Finder V3',
  description: 'Find your favorite movies and TV shows',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          dmSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <div className="flex min-h-screen w-full flex-col">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
