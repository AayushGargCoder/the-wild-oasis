import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editCabin } from "../../services/apiCabins";

export function useEditCabins() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ newEditData, id }) => editCabin(newEditData, id),
    onSuccess: () => {
      //Refetch the data, so best way to invalidate the cache
      toast.success("Cabin Updated Successfully");
      //1 way to invalidate queries
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLoading, mutate };
}
