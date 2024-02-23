import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-red">
        <Link href="/login">Login Page</Link>
      </h1>
      <h1 className="text-orange">
        <Link href="/account">Account Page</Link>
      </h1>
    </>
  );
}
