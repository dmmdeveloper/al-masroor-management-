import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOne, fetchSingleMember } from "../store/slices/memberSlice";
import store from "../store/store";
import { fetchMembers } from "../store/slices/membersSlice";

function SingleMember() {
  const { id } = useParams();
  const [zoomedImage, setZoomedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const dispatch = useDispatch();
  const { member, singleMemberLoading } = useSelector((store) => store.member);

  // http://localhost:4000/member/member/67d000abe7da79af6158942e

  // Toggle zoom state
  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
    setZoomLevel(1); // Reset zoom level when opening
  };

  useEffect(() => {
    dispatch(fetchSingleMember(id));
  }, [id]);

  return (
    <>
      {singleMemberLoading ? (
        <MemberDetailsSkeleton />
      ) : (
        <>
          <div className="min-h-screen h-auto bg-gray-900 flex justify-center items-center text-white p-3 md:p-6">
            <div className="bg-gray-800 shadow-lg rounded-xl p-2 md:p-6 w-full max-w-2xl border border-gray-700">
              <h1 className="text-2xl font-bold text-center mb-4">
                Member Details
              </h1>
              {/* Profile Picture */}
              <div className="flex justify-center mb-4">
                <img
                  src={`${member?.photo}`}
                  alt="Profile"
                  className="w-[200px] h-[200px] rounded-full object-cover border-2 border-gray-500 cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => handleImageClick(`${member?.photo}`)}
                />
              </div>
              {/* Personal Details */}
              <div className="border-b border-gray-700 pb-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Name", value: member?.name },
                    { label: "Father Name", value: member?.father_name },
                    { label: "Contact", value: member?.contact },
                    { label: "CNIC", value: member?.cnic },
                    { label: "Work Post", value: member?.work_post },
                    { label: "Religion", value: member?.religion },
                  ].map((item, index) =>
                    item.value ? (
                      <p key={index} className="break-words">
                        <strong>{item.label}:</strong> {item.value}
                      </p>
                    ) : null
                  )}
                </div>
                {member?.work_place && (
                  <div className="mt-4">
                    <p>
                      <strong>Work Place:</strong> {member?.work_place}
                    </p>
                  </div>
                )}
              </div>

              {/* CNIC Picture */}
              <div className="border-b border-gray-700 pb-4 mb-4">
                <p className="font-semibold text-center mb-2">CNIC Picture</p>
                <div className="flex justify-center">
                  <img
                    src={member?.cnic_pic}
                    alt="CNIC"
                    className="md:w-[300px] w-[90%]  h-auto border border-gray-500 rounded-md cursor-pointer transition-transform duration-300 hover:scale-110"
                    onClick={() => handleImageClick(member?.cnic_pic)}
                  />
                </div>
              </div>

              {/* Relatives Information 1 */}
              <RelativsDetail
                handleImageClick={handleImageClick}
                number={1}
                name={member?.relative1_name}
                relation={member?.relative1_relation}
                contact={member?.relative1_contact}
                cnicPic={member?.relative1_cnic_pic}
              />
              {/* Relatives Information 2 */}
              <RelativsDetail
                handleImageClick={handleImageClick}
                number={2}
                name={member?.relative2_name}
                relation={member?.relative2_relation}
                contact={member?.relative2_contact}
                cnicPic={member?.relative2_cnic_pic}
              />

              {/* Created & Updated Time */}
              <div className="text-center text-gray-400">
                {/* Back  */}
                {/* Edit  */}
                {/* Delete */}
                <AddDeleteEdit id={member?._id} />
              </div>
            </div>
            {/* Zoomed Image Modal with Controls */}
            {zoomedImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-80   flex flex-col justify-center items-center p-4 z-50"
                onClick={() => setZoomedImage(null)}
              >
                <div
                  className="relative flex flex-col  touch-autoitems-center"
                  onClick={(e) => e.stopPropagation()} // Prevent closing modal on button clicks
                >
                  <img
                    src={zoomedImage}
                    alt="Zoomed"
                    className="rounded-md transition-transform touch-auto duration-300"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      maxWidth: "90vw",
                      maxHeight: "90vh",
                    }}
                  />
                </div>
                <button className="text-white absolute top-3 right-5 text-2xl">
                  X
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default SingleMember;

const AddDeleteEdit = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const deleteMem = async () => {
    const result = await dispatch(deleteOne(id));
    if (result.payload) {
      await dispatch(fetchMembers()); // Refresh members list
     navigate("/"); // Redirect after deletion
      setShowPopup(false); // Close popup
    }
  };
  const { deleteLoading } = useSelector((store) => store.member);
  return (
    <>
      {/* Buttons */}
      <div className="w-full flex justify-between">
        <Link
          to={"/"}
          className="text-white border py-1 px-3 rounded-md hover:opacity-70 duration-200"
        >
          Back
        </Link>
        <Link
          to={`/edit/${id}`}
          className="text-white border py-1 px-3 rounded-md hover:opacity-70 duration-200"
        >
          Edit
        </Link>
        <button
          onClick={() => setShowPopup(true)}
          className="text-white border py-1 px-3 rounded-md hover:opacity-70 duration-200"
        >
          Delete
        </button>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="text-sm text-gray-300 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={deleteMem}
                className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-600 px-4 py-2 rounded-md text-white hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function RelativsDetail({
  handleImageClick,
  number,
  name,
  cnicPic,
  contact,
  relation,
}) {
  // Check if any data is provided
  const hasData = name && relation && cnicPic && contact;

  return (
    <>
      {hasData && (
        <div className="border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-xl font-bold text-center mb-2">
            Relative {number} Detail
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {name && (
              <p>
                <strong>Name:</strong> {name}
              </p>
            )}
            {relation && (
              <p>
                <strong>Relation:</strong> {relation}
              </p>
            )}
            {contact && (
              <p>
                <strong>Contact:</strong> {contact}
              </p>
            )}
          </div>

          {cnicPic && (
            <>
              <p className="font-semibold text-center mt-2">
                Relative's {number} CNIC Picture
              </p>
              <div className="flex justify-center mt-2">
                <img
                  src={cnicPic}
                  alt="Relative CNIC"
                  className="touch-auto w-[90%] md:w-[300px] h-auto border border-gray-500 rounded-md cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => handleImageClick(cnicPic)}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

function MemberDetailsSkeleton() {
  return (
    <div className="min-h-screen h-auto bg-gray-900 flex justify-center items-center text-white p-3 md:p-6">
      <div className="bg-gray-800 shadow-lg rounded-xl p-2 md:p-6 w-full max-w-2xl border border-gray-700">
        <h1 className="text-2xl font-bold text-center mb-4">Member Details</h1>
        {/* Profile Picture Skeleton */}
        <div className="flex justify-center mb-4">
          <div className="w-[200px] h-[200px] rounded-full bg-gray-700 animate-pulse"></div>
        </div>

        {/* Personal Details Skeleton */}
        <div className="border-b border-gray-700 pb-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-5 bg-gray-700 animate-pulse rounded w-3/4 sm:w-5/6"
                ></div>
              ))}
          </div>
          <div className="mt-4 h-5 bg-gray-700 animate-pulse rounded w-1/2 sm:w-1/3"></div>
        </div>

        {/* CNIC Picture Skeleton */}
        <div className="border-b border-gray-700 pb-4 mb-4">
          <p className="font-semibold text-center mb-2">CNIC Picture</p>
          <div className="flex justify-center">
            <div className="md:w-[300px] w-[90%] h-40 bg-gray-700 animate-pulse rounded-md"></div>
          </div>
        </div>

        {/* Relatives Skeleton */}
        {[1, 2].map((num) => (
          <div key={num} className="border-b border-gray-700 pb-4 mb-4">
            <h2 className="text-xl font-bold text-center mb-2">
              Relative {num} Detail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-5 bg-gray-700 animate-pulse rounded w-3/4"
                  ></div>
                ))}
            </div>
            <div className="flex justify-center mt-2">
              <div className="md:w-[300px] w-[90%] h-40 bg-gray-700 animate-pulse rounded-md"></div>
            </div>
          </div>
        ))}

        {/* Buttons Skeleton */}
        <div className="text-center text-gray-400 flex justify-center gap-4 mt-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-24 h-8 bg-gray-700 animate-pulse rounded"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}
