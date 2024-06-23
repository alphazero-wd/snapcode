"use client";
import { Button } from "@/features/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/ui/dialog";
import { Input } from "@/features/ui/input";
import { Label } from "@/features/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/features/ui/form";
import { useDeleteAccount } from "./use-delete";
import { Spinner } from "@/features/ui/spinner";

export const ConfirmDeleteModal = () => {
  const { isModalOpen, onModalOpen, onModalClose, loading, onSubmit, form } =
    useDeleteAccount();

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <Button onClick={onModalOpen} variant="destructive">
        Delete account
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete account confirmation</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and your associated data on Snapcode.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label className="block">
                    To confirm, type in your password
                  </Label>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-3 border-t pt-4">
              <Button type="button" variant="outline" onClick={onModalClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || !form.getValues("password")}
                variant="destructive"
              >
                {loading && <Spinner />} {loading ? "Deleting..." : "Continue"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
