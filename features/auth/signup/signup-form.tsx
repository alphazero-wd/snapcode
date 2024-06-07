"use client";
import { Button } from "@/features/ui/button";
import { Input } from "@/features/ui/input";
import { Label } from "@/features/ui/label";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/features/ui/form";
import { useSignup } from "./use-signup";
import { Spinner } from "@/features/ui/spinner";

export const SignupForm = () => {
  const { form, loading, onSubmit } = useSignup();
  return (
    <div className="grid gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  disabled={loading}
                  {...field}
                  id="username"
                  placeholder="tim-foo"
                />
                <FormDescription>
                  Username can only be 30 characters long, contain letters,
                  numbers and underscores or hypens.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  disabled={loading}
                  {...field}
                  placeholder="m@example.com"
                />
                <FormDescription>
                  Your email will be kept private
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  disabled={loading}
                  id="password"
                  {...field}
                  type="password"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Spinner /> : "Create an account"}
          </Button>
        </form>
      </Form>
      <Button variant="outline" className="w-full">
        Sign up with GitHub
      </Button>
    </div>
  );
};
