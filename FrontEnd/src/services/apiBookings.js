// import { getToday } from "../utils/helpers";

import { PAGE_SIZE } from "../utils/constants";

export async function getAllBookings(filterBy, sortBy, currPage) {
  try {
    let sort = sortBy
      ? `sort=${
          sortBy.split("-")[1] === "asc"
            ? sortBy.split("-")[0]
            : `-${sortBy.split("-")[0]}`
        }`
      : "";

    let filter = filterBy ? `status=${filterBy}` : "";
    let queryStr = "";
    if (filter) queryStr = `${filter}&`;
    if (sort) queryStr += `${sort}&`;

    queryStr += `page=${currPage}&limit=${PAGE_SIZE}`;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings?${queryStr}`,
      {
        withCredentials: true,
      }
    );
    const { data } = await res.json();
    return data.bookings;
  } catch (err) {
    throw new Error("Unable  to fetch Bookings data");
  }
}

export async function getBooking(bookingId) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`
    );
    const { data } = await res.json();
    return data.booking[0];
  } catch (err) {
    throw new Error("Unable  to fetch Bookings data");
  }
}

export async function updateBooking(bookingId, booking) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`,
      {
        method: "PATCH",
        body: JSON.stringify(booking),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = await res.json();
    return data.newBooking;
  } catch (err) {
    throw new Error("Unable  to fetch Bookings data");
  }
}

export async function getStaysAfterDate(date) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings/getStaysAfterDate/${date}`
    );
    const { data } = await res.json();
    return data.dataBookings;
  } catch (err) {
    throw new Error("Unable  to fetch Bookings data");
  }
}
export async function getBookingsAfterDate(date) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings/getBookingsAfterDate/${date}`
    );
    const { data } = await res.json();
    return data.dataBookings;
  } catch (err) {
    throw new Error("Unable  to fetch Bookings data");
  }
}
export async function getStaysTodayActivity() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings/getStaysTodayActivity`
    );

    const { data } = await res.json();
    return data.dataBookings;
  } catch (err) {
    throw new Error("Unable  to fetch Bookings data");
  }
}

// export async function updateBooking(id, obj) {}

export async function deleteBooking(bookingId) {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}`, {
      method: "DELETE",
    });
  } catch (err) {
    throw new Error("Unable  to Delete Booking");
  }
}
