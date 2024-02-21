import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text">XiangYu</h1>
      <h1 className="text-darkblue">XiangYu</h1>
      <h2 className="text-red">XiangYu</h2>
      <h3 className="text-orange">XiangYu</h3>
      <Link href="/login">Login Page</Link>
    </>
  );
}
