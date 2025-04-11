import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <h1>Hello World</h1>
      <Link href={"/user"} className="underline text-blue-700">Go To User</Link>
      <br />
      <Link href={"/admin"} className="underline text-blue-700">Go To Admin</Link>
    </div>
  );
}