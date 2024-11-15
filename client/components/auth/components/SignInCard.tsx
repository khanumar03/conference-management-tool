import Link from "next/link";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { trpc } from "@/server/client";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schema";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignInCard = () => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(undefined);
  const mutation = trpc.user.login.useMutation();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
      mutation.mutate(values)
      if(mutation.isSuccess) router.replace("/")
      if(mutation.isError) setError(mutation.error.message)
  };

  return (
    <Card className="w-full h-full md:w-[487px] ">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2x;">Welcome Back!</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p>{error}</p>}
            <Button disabled={false} size="lg" className="w-full">
              Login
            </Button>
            <Button
              asChild
              variant="secondary"
              disabled={false}
              size="lg"
              className="w-full"
            >
              <Link href="/sign-up">Create New Account</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
        <CardContent className="p-7 flex flex-col gap-y-4">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            disabled={false}
          >
            <FcGoogle />
            Login with Google
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};
