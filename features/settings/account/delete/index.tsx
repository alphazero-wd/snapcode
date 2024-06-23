import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/features/ui/card";
import { ConfirmDeleteModal } from "./confirm";

export const DeleteAccount = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete your account</CardTitle>
        <CardDescription>
          There&apos;s no going back. Please be certain before doing this
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ConfirmDeleteModal />
      </CardContent>
    </Card>
  );
};
