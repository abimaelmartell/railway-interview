import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-4xl font-bold">Railway Interview Project</h1>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Link
          href="/containers"
          className="text-blue-500 hover:text-blue-600 border border-blue-500 rounded-md p-2"
        >
          Go to container list
        </Link>
      </main>
    </div>
  )
}
