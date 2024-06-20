"use client";
import { Label } from "@/features/ui/label";
import { Button } from "@/features/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/features/ui/form";
import { Input } from "@/features/ui/input";
import { Spinner } from "@/features/ui/spinner";
import { useBasicInfoForm } from "./use-basic-info";
import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  LOCATION_MAX_LENGTH,
} from "@/constants";
import { Textarea } from "@/features/ui/textarea";

interface BasicInfoFormProps {
  profileId: string;
  bio?: string;
  displayName?: string;
  location?: string;
}

export const BasicInfoForm = (props: BasicInfoFormProps) => {
  const { form, loading, onSubmit } = useBasicInfoForm(props);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <Label htmlFor="displayName">Display name</Label>
              <Input
                id="displayName"
                disabled={loading}
                {...field}
                placeholder="Tim Foo"
              />
              {NAME_MAX_LENGTH >= (field.value?.length || 0) ? (
                <FormDescription>
                  {NAME_MAX_LENGTH - (field.value?.length || 0)} characters
                  remaining
                </FormDescription>
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <Label htmlFor="displayName">Bio</Label>
              <Textarea
                {...field}
                className="min-h-32 resize-none"
                disabled={loading}
                placeholder="A short description about yourself..."
              />
              {BIO_MAX_LENGTH >= (field.value?.length || 0) ? (
                <FormDescription>
                  {BIO_MAX_LENGTH - (field.value?.length || 0)} characters
                  remaining
                </FormDescription>
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <Label htmlFor="displayName">Location</Label>
              <Input
                id="displayName"
                disabled={loading}
                {...field}
                placeholder="Where do you live?"
              />
              {LOCATION_MAX_LENGTH >= (field.value?.length || 0) ? (
                <FormDescription>
                  {NAME_MAX_LENGTH - (field.value?.length || 0)} characters
                  remaining
                </FormDescription>
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="w-fit">
          {loading && <Spinner />} {loading ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
};
