import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-3xl font-bold">Hello This is Admin Page</h1>
            <Link className='underline text-blue-600' href="/admin/add-region/">Add New State </Link>
    </div>
  )
}