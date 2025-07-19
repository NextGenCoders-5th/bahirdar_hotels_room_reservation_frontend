import { Card } from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContext";

const UserProfile = () => {
  const { user } = useAuthContext()
  if (user === null)
  {
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6 shadow-lg rounded-2xl">
        <h1 className="text-2xl font-semibold">User not found</h1>
      </Card>
    </div>
  }


  return (
    <div className="flex justify-center items-start w-full h-full bg-gray-100 p-4">
      <div className="bg-white shadow-lg p-10 rounded-2xl  w-full">
        <div className="flex items-strech p-4 gap-10 w-full">
          <div className="flex flex-col  items-center">
            <img
              src={user?.profilePicture}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-accent-500 object-cover"
            />
            <div className="flex items-center flex-col">
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500">@{user?.username}</p>
            </div>
          </div>
          <div className="mt-6 shadow-lg shadow-slate-100  p-4">
            <h3 className="text-lg font-semibold text-gray-700">User Info</h3>
            <ul className="mt-2 text-gray-600">
              <li><strong>Email:</strong> {user?.email}</li>
              <li><strong>Phone:</strong> {user?.phoneNumber}</li>
              <li><strong>Gender:</strong> {user?.gender || <span className=" italic ">No gender</span>}</li>
              <li><strong>Date of Birth:</strong> {user?.dateOfBirth ? new Date(user?.dateOfBirth || "").toDateString() : <span className="italic">No birth date</span> }</li>
              <li><strong>Role:</strong> {user?.role}</li>
              <li><strong>Verified:</strong> {user?.isVerified ? "Verfied✅" : "Not Verfied❌"}</li>
            </ul>
          </div>
          {
            user?.address && (<div className="mt-6  shadow-lg shadow-slate-100  p-4">
              <h3 className="text-lg font-semibold text-gray-700">Address information</h3>
              <ul className="mt-2 text-gray-600">
                <li><strong>Country:</strong> {user?.address.country}</li>
                <li><strong>City:</strong> {user?.address.city}</li>
                <li><strong>Subcity:</strong> {user?.address.subcity}</li>
                <li><strong>Wereda:</strong> {user?.address.woreda}</li>
                <li><strong>Street:</strong> {user?.address.street}</li>
              </ul>
            </div>)
          }
        </div>
        <div className="mt-6 flex flex-col md:flex-row items-center shadow-lg shadow-slate-200 justify-start gap-4">
          {user?.idPhoto_front && <div className="flex items-center flex-col-reverse p-4 gap-2">
            <h2 className="italic text-slate-700">Front Side of the ID</h2>
            <img
              src={user?.idPhoto_front}
              alt="ID Front"
              className="w-48 h-48 object-cover rounded-lg border"
            />
          </div>}
          {user?.idPhoto_back && <div className="flex items-center flex-col-reverse p-4 gap-2">
            <h2 className="text-slate-700 italic">Back Side of the ID</h2>
            <img
              src={user?.idPhoto_back}
              alt="ID Back"
              className="w-48 h-48 object-cover rounded-lg border"
            />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;