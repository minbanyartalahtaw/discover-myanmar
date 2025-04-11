import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className='h-16'></div>
      <h1 className="text-3xl font-bold">Hello This is Admin Page</h1>
      <p>We have to write login method here.</p>
      <Link className="underline text-blue-700" href="/admin/add-region/" >Go To Add Region</Link>
      <br />
      <Link className="underline text-blue-700" href="/admin/edit-categories/" >Go To Edit Category</Link>
    </div>
  )
}