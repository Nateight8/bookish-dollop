import { auth } from "~/server/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="">
      <div className="h-14 border-b bg-background "></div>
      <div className="h-[200vh] max-w-md bg-background mx-auto border"></div>
    </div>
  );
}
