import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      //Refetch the data, so best way to invalidate the cache
      toast.success(
        `Booking ${data._id.slice(21, 24)} checkedOut Successfully`
      );
      //2 way to invalidate queries
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was an error while Checking Out"),
  });
  return { isCheckingOut, checkOut };
}
