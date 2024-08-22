import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
export default function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  let filter = searchParams.get("status");
  if (filter === "all") filter = "";

  let sortBy = searchParams.get("sortBy");
  if (sortBy === "startDate-desc") sortBy = "";

  const currPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["Bookings", filter, sortBy, currPage],
    queryFn: () => getAllBookings(filter, sortBy, currPage),
  });
  const pageCount = bookings?.length / PAGE_SIZE;
  if (currPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["Bookings", filter, sortBy, currPage],
      queryFn: () => getAllBookings(filter, sortBy, 1 + currPage),
    });
  }
  if (currPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["Bookings", filter, sortBy, currPage],
      queryFn: () => getAllBookings(filter, sortBy, currPage - 1),
    });
  }
  return { isLoading, bookings };
}
