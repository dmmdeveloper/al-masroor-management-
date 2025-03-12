import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function SingleMember() {
  const { id } = useParams();
  const [zoomedImage, setZoomedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Toggle zoom state
  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
    setZoomLevel(1); // Reset zoom level when opening
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 1));
  const handleResetZoom = () => setZoomLevel(1);
  return (
    <div className="min-h-screen h-auto bg-gray-900 flex justify-center items-center text-white p-3 md:p-6">
      <div className="bg-gray-800 shadow-lg rounded-xl p-2 md:p-6 w-full max-w-2xl border border-gray-700">
        <h1 className="text-2xl font-bold text-center mb-4">Member Details</h1>

        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <img
            src="https://res.cloudinary.com/dfyfvcrkd/image/upload/v1741684902/uploads/WhatsApp_Image_2024-10-23_at_12.10.28_AM_c33bd9.jpg"
            alt="Profile"
            className="w-[200px] h-[200px] rounded-full object-cover border-2 border-gray-500 cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={() =>
              handleImageClick(
                "https://res.cloudinary.com/dfyfvcrkd/image/upload/v1741684902/uploads/WhatsApp_Image_2024-10-23_at_12.10.28_AM_c33bd9.jpg"
              )
            }
          />
        </div>
        {/* Personal Details */}
        <div className="border-b border-gray-700 pb-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Name:</strong> Jawad Ali
            </p>
            <p>
              <strong>Father Name:</strong> tfygbhjnkm
            </p>
            <p>
              <strong>Contact:</strong> 234
            </p>
            <p>
              <strong>CNIC:</strong> 345
            </p>
            <p>
              <strong>Work Post:</strong> Doctor
            </p>
            <p>
              <strong>Religion:</strong> Muslim
            </p>
          </div>
          <div className="mt-4">
            <p>
              <strong>Workplace:</strong> Chandka
            </p>
          </div>
        </div>

        {/* CNIC Picture */}
        <div className="border-b border-gray-700 pb-4 mb-4">
          <p className="font-semibold text-center mb-2">CNIC Picture</p>
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/dfyfvcrkd/image/upload/v1741684903/uploads/WhatsApp_Image_2025-03-02_at_21.53.28_c466d5c0_ee0ptt.jpg"
              alt="CNIC"
              className="md:w-[300px] w-[90%]  h-auto border border-gray-500 rounded-md cursor-pointer transition-transform duration-300 hover:scale-110"
              onClick={() =>
                handleImageClick(
                  "https://res.cloudinary.com/dfyfvcrkd/image/upload/v1741684903/uploads/WhatsApp_Image_2025-03-02_at_21.53.28_c466d5c0_ee0ptt.jpg"
                )
              }
            />
          </div>
        </div>

        {/* Relatives Information */}
        <div className="border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-xl font-bold text-center mb-2">Relatives</h2>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Name:</strong> 234
            </p>
            <p>
              <strong>Relation:</strong> Father
            </p>
            <p>
              <strong>Contact:</strong> 345
            </p>
          </div>
          <p className="font-semibold text-center mt-2">
            Relative's CNIC Picture
          </p>
          <div className="flex justify-center mt-2">
            <img

              src="https://res.cloudinary.com/dfyfvcrkd/image/upload/v1741684904/uploads/WhatsApp_Image_2024-10-23_at_12.10.28_AM_hetvpn.jpg"
              alt="Relative CNIC"
              className="m:w-[300px] w-[90%] touch-auto h-auto border border-gray-500 rounded-md cursor-pointer transition-transform duration-300 hover:scale-110"
              onClick={() =>
                handleImageClick(
                  "https://res.cloudinary.com/dfyfvcrkd/image/upload/v1741684904/uploads/WhatsApp_Image_2024-10-23_at_12.10.28_AM_hetvpn.jpg"
                )
              }
            />
          </div>
        </div>

        {/* Created & Updated Time */}
        <div className="text-center text-gray-400">
          {/* Back  */}
          {/* Edit  */}
          {/* Delete */}
          <AddDeleteEdit/>
    
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

            {/* Zoom Controls */}
            {/* <div className="fixed bottom-10 bg-gray-800/90 backdrop-blur-md text-white p-3 rounded-lg flex gap-3 shadow-lg z-50">
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-2xl transition-all rounded-md"
                onClick={handleZoomIn}
              >
                +{" "}
              </button>
                 <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-all rounded-md"
                onClick={handleResetZoom}
              >
               Reset
              </button>

              <button
                className="px-4 py-2 text-2xl bg-gray-700 hover:bg-gray-600 transition-all rounded-md"
                onClick={handleZoomOut}
              >
                -
              </button>

              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-500 transition-all rounded-md"
                onClick={() => setZoomedImage(null)}
              >
X              </button>

           
            </div> */}
          </div>
<button className="text-white absolute top-3 right-5 text-2xl" >X</button>

        </div>
      )}

    </div>
  );
}

export default SingleMember;


function AddDeleteEdit({}) {
  return(<>
            {/* Back  */}
          {/* Edit  */}
          {/* Delete */}
          <div className=" w-full flex justify-between">
          <Link to={"/"} className="text-white border py-1 px-3 rounded-md hover:opacity-70 duration-200" >Back</Link>
          <Link to={"/edit"} className="text-white border py-1 px-3 rounded-md hover:opacity-70 duration-200" >Edit</Link>
          <button to={"/edit"} className="text-white border py-1 px-3 rounded-md hover:opacity-70 duration-200" >Delete</button>

      





          </div>
  
  
  
  </>)
  
}