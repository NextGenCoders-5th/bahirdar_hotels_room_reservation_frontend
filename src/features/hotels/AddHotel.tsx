import toast from "react-hot-toast";
import ManageHotelForm from "../../forms/manageHotelForm/ManageHotelForm";
import { useCreateHotelMutation } from "../../redux/api/hotelApi";

function AddHotel() {
  const [addHotel, { isLoading }] = useCreateHotelMutation();

  const handleSubmit =  async (hotel: FormData) => {
   await addHotel(hotel).unwrap().then(() => {
      toast.success("Hotel added successfully");
    }).catch((err) => {
      toast.error(JSON.stringify(err));
    });
  };

  return <ManageHotelForm onSubmit={handleSubmit} isAdding={isLoading} />;
}

export default AddHotel;
