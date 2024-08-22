import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "./../../utils/helper";
import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  //1.
  const numBookings = bookings.length;
  //2.
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  //3.
  const checkins = confirmedStays.length;
  //4.total check in nights/total nights*all cabins
  const occupancy =
    confirmedStays.reduce((acc, booking) => acc + booking.numNights, 0) /
    (numDays * cabinsCount);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}

export default Stats;
