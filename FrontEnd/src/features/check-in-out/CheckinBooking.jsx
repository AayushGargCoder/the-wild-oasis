import Row from "./../../ui/Row";
import Heading from "./../../ui/Heading";
import ButtonGroup from "./../../ui/ButtonGroup";
import Button from "./../../ui/Button";
import ButtonText from "./../../ui/ButtonText";

import BookingDataBox from "./../bookings/BookingDataBox";
import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Checkbox from "./../../ui/Checkbox";
import { formatCurrency } from "../../utils/helper";
import { useChecking } from "./useChecking";
import { useSettings } from "../settings/useSettings";
const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  useEffect(() => setConfirmPaid(booking?.isPaid), [booking]);
  const moveBack = useMoveBack();
  const { isCheckingIn, checkin } = useChecking();
  if (isLoading || isLoadingSettings) return <Spinner />;
  const { breakFastPrice } = settings;
  const {
    _id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    guests: { fullName },
  } = booking;

  const optionalBreakFastPrice = breakFastPrice * numGuests;

  function handleCheckin() {
    if (addBreakfast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakFastPrice,
          totalPrice: totalPrice + optionalBreakFastPrice,
        },
      });
    else checkin({ bookingId, breakfast: {} });
  }

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId.slice(21, 24)}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakFast for {formatCurrency(optionalBreakFastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((check) => !check)}
          id="confirm"
          disabled={confirmPaid}
        >
          I Confirm that {fullName} has paid the total amount of{" "}
          {addBreakfast
            ? `${formatCurrency(totalPrice + optionalBreakFastPrice)} 
               (${formatCurrency(totalPrice)}+${formatCurrency(
                optionalBreakFastPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId.slice(21, 24)}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
