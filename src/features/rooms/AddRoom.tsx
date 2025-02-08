import { toast } from "react-toastify";
import ManageRoomForm from "../../forms/manageRoomForm/ManageRoomForm";
import { useCreateRoomMutation } from "../../redux/api/roomsApi";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { Role } from "../../enums/roleEnum";

function AddRoom() {

  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { hotelId } = useParams<{ hotelId: string }>();

  const [createRoom, { isLoading }] = useCreateRoomMutation()
  const onSubmitHandler = (room: FormData) => {
    try
    {

      createRoom(room).unwrap().then(() => {
        navigate(`/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}/rooms`)
        toast.success("Room added succefully")
      }).catch((err) => {
        if ('data' in err)
        {
          const { message } = err.data as { message: string }
          toast.error(message || "Failed to add room")
        }
        else
        {
          toast.error(JSON.stringify(err, null, 2))
        }
      })
    }
    catch (err)
    {
      console.error(err)
      toast.error("Cannot add room please try again")
    }
  };

  return <ManageRoomForm onSubmit={onSubmitHandler} isAdding={isLoading} />;
}

export default AddRoom;
