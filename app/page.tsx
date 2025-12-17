import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col p-4 rounded-lg border-black border">
          <div className="flex justify-center ">
            <p className="text-center text-2xl font-bold">
              Wellcome, please sign in or log in
            </p>
          </div>
          <div className="flex mt-4 flex-row gap-4 justify-center">
            <Link className="px-2 py-1 rounded-lg bg-green-500 text-white hover:bg-green-60" href="/signin">Signin</Link>
            <Link className="px-2 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-60" href="/signup">Signup</Link>
          </div>

        </div>
    </div>
    </>
  );
}
