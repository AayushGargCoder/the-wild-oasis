import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Spinner from "./../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import Row from "./../../ui/Row";
import Heading from "./../../ui/Heading";
import Tag from "./../../ui/Tag";
import ButtonGroup from "./../../ui/ButtonGroup";
import Button from "./../../ui/Button";

import { useBooking } from "./useBooking";
// import { useDeleteBooking } from "./useDeleteBooking";
import { useMoveBack } from "./../../hooks/useMoveBack";
// import { useCheckout } from "features/check-in-out/useCheckout";
import ButtonText from "./../../ui/ButtonText";
import Empty from "./../../ui/Empty";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { isDeletingBooking, mutate: deleteBooking } = useDeleteBooking();
  // const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { isCheckingOut, checkOut } = useCheckout();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  let { _id: bookingId, status } = booking;

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Booking #{bookingId.slice(21, 24)}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkOut(bookingId);
            }}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}
        <Modal>
          <Modal.Toggle opens="delete-booking">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Toggle>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resource="booking"
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
