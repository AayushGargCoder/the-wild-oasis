// We use react-hook-form to make working with complex and REAL-WORLD forms a lot easier. It handles stuff like user validation and errors. manages the form state for us, etc
// // Validating the user’s data passed through the form is a crucial responsibility for a developer.
// // React Hook Form takes a slightly different approach than other form libraries in the React ecosystem by adopting the use of uncontrolled inputs using ref instead of depending on the state to control the inputs. This approach makes the forms more performant and reduces the number of re-renders.
//   // One of the key concepts in React Hook Form is to register your component into the hook. This will make its value available for both the form validation and submission.
// By default, validation happens the moment we submit the form, so when we call handleSubmit. From them on, validation happens on the onChange event [demonstrate]. We cah change that by passing options into useForm ('mode' and 'reValidateMode')
/* register your input into the hook by invoking the "register" function */
//         {/* why the ...? Because this will return an object { onChange, onBlur, customer, ref }, and by spreading we then add all these to the element [show dev tools] */}
//         {/* include validation with required or other standard HTML validation rules: required, min, max, minLength, maxLength, pattern, validate */}
//         {/* errors will return when field validation fails  */}

import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";

import FormRow from "../../ui/FormRow";
import { useCreateCabins } from "./useCreateCabins";
import { useEditCabins } from "./useEditCabins";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(cabinToEdit._id);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: cabinToEdit,
  });
  const { errors } = formState;
  const { isLoading: isCreatingCabin, mutate: isCreating } = useCreateCabins();
  const { isLoading: isEditingCabin, mutate: isEditing } = useEditCabins();

  const isWorking = isEditingCabin || isCreatingCabin;

  function onSubmit(data) {
    if (isEditSession)
      isEditing(
        { newEditData: { ...data }, id: cabinToEdit._id },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        }
      );
    else
      isCreating(data, {
        onSuccess: () => {
          reset();
          onCloseModal();
        },
      });
  }

  function onError(err) {
    console.log(err);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", { required: "This field  is required" })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field  is required",
            min: { value: 1, message: "The capacity should at least be 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field  is required",
            min: { value: 1, message: "The capacity should at least be 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field  is  required",
            validate: (value) =>
              getValues().regularPrice * 1 >= value * 1 ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          // {...register("image", {
          //   required: isEditSession ? false : "This field is required",
          // })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
