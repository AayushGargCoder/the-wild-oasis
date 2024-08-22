import styled from "styled-components";
import { formatCurrency } from "./../../utils/helper";

import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";
import { useDeleteCabin } from "./useDeleteCabins";
import { useCreateCabins } from "./useCreateCabins";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "./../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    _id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  const { isLoading: isDeletingCabin, mutate } = useDeleteCabin();
  const { mutate: isCreating, isLoading: isCreatingCabin } = useCreateCabins();

  function handleDublicate() {
    const dublicateCabin = {
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    };
    isCreating(dublicateCabin);
  }

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />

              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={() => handleDublicate()}
                  isdisabled={isCreatingCabin}
                >
                  Dublicate
                </Menus.Button>

                <Modal.Toggle opens="edit-cabin">
                  <Menus.Button icon={<HiPencil />}>Editing</Menus.Button>
                </Modal.Toggle>

                <Modal.Toggle opens="delete-cabin">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Toggle>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resource="Cabin"
                disabled={isDeletingCabin}
                onConfirm={() => mutate(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
