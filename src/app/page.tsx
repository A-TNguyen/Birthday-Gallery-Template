import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { isClerkAuthSkipped } from "@/lib/preview";

export default function Home() {
  if (isClerkAuthSkipped) {
    redirect("/home");
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <SignIn routing="hash" />
    </div>
  );
}
