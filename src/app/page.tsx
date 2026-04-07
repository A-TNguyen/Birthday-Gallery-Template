import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <SignIn routing="hash" />
    </div>
  );
}
