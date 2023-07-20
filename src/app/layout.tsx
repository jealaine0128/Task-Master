import '../lib/globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Task Master',
  description: 'This is a task manager app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-slate-50'>{children}</body>
    </html>
  )
}
