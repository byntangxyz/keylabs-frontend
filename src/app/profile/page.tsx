import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground font-semibold">
                {getInitials(session.user?.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">{session.user?.name}</CardTitle>
          <CardDescription className="text-lg mt-2">{session.user?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center p-4 border rounded-lg bg-muted/50">
              <span className="font-semibold col-span-1">Account ID</span>
              <span className="col-span-2 font-mono text-sm break-all">{session.user?.id}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
