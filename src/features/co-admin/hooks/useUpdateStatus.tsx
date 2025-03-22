import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/userApi";
import { toast } from "sonner";
import { UserStatusRequest } from "../types/user.type";

export const useUpdateStatusAPI  = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation<void, Error, UserStatusRequest>({
    mutationFn: async (userData:any) => {
      await userApi.userStatusUpdate(userData);
    },
    onSuccess: () => {
      toast.success("User status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userStatusUpdate"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Status update failed");
    }
  });

  return { mutate, isLoading: isPending, error };
};
