import Collections from "~/components/nav/shop/collections";
import AuthStatus from "~/components/user/auth-status";
import { auth } from "~/server/auth";

export default async function Page() {
  const session = await auth();

  return (
    <main className="">
      <div className="container mx-auto p-4">
        {/* Your page content goes here */}
        <h1 className="text-2xl font-bold">Welcome to Disconnect</h1>
        {session ? (
          <p>Welcome back, {session.user?.name}!</p>
        ) : (
          <p>Please sign in to continue.</p>
        )}
      </div>
      <Collections />
    </main>
  );
}
