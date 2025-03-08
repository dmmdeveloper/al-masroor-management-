import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, clearError } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Form() {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const naviate = useNavigate();
  const verify = (e) => {
    e.preventDefault();
    // call your action here
    dispatch(authenticate(code));
  };
  const { errorMessage, isAuthenticated } = useSelector((store) => store.auth);

  useEffect(() => {
    if (isAuthenticated) {
      naviate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="h-screen w-full bg-black fixed top-0 flex justify-center  items-center">
        <form
          onSubmit={verify}
          className="h-auto md:p-6 p-3 w-[90%] md:w-[400px] rounded-lg border-appYellow border bg-halfBlack"
        >
          <div className="flex flex-col gap-2 md:gap-3">
            <label htmlFor="" className=" text-white text-2xl md:text-3xl">
              Enter Password
            </label>
            <div className="">
              <input
                required
                onFocus={() => dispatch(clearError())}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type={`${showPassword ? "text" : "password"  }`}
                className={`bg-transparent ${
                  errorMessage ? "border-red-600 text-red-700" : ""
                }  w-full border-appYellow  outline-none border rounded-lg md:p-3 p-[6px] md:text-2xl text-[20px] text-appYellow `}
              />
              {errorMessage && (
                <p className="text-red-600 italic text-[17px] md:text-xl">
                  Invalid Password
                </p>
              )}
            </div>
            <p className="flex gap-2  md:text-2xl  text-[20px] text-appYellow select-none">
              <input
              onClick={()=> setShowPassword(!showPassword)}
                type="checkbox"
                className="md:scale-150 scale-125 accent-appYellow"
                name=""
                id="show-password"
              />
              <label htmlFor="show-password">{showPassword ? "Hide":"Show"} Password</label>
            </p>
          </div>
          {/* Submit */}
          <div className="mt-5">
            <button className="bg-white w-full text-[20px] md:text-2xl text-appYellow rounded-lg  p-1 md:p-3">
              Verify
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Form;
