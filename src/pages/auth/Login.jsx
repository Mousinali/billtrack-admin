import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";
import Logo from "../../assets/logo/logo.png";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [step, setStep] = useState("email");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/";

  const VALID_NUMBER = "6290397299";
  const VALID_OTP = "1234";

  // ⭐ AUTO-FOCUS OTP when screen appears
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => {
        document.getElementById("otp-0")?.focus();
      }, 50);
    }
  }, [step]);

  // SEND OTP
  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Enter your mobile number.");
      return;
    }

    if (email !== VALID_NUMBER) {
      toast.error("This number is not registered");
      return;
    }

    setStep("otp");
    setError("");
    toast.success("OTP sent successfully!");
  };

  // VERIFY OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp === VALID_OTP) {
      const res = login();

      if (res.success) {
        toast.success("Login successful!");
        navigate("/", { replace: true });
      }
    } else {
      toast.error("Invalid OTP. Try 1234.");

      setOtp("");
      setOtpDigits(["", "", "", ""]);

      setTimeout(() => {
        document.getElementById("otp-0")?.focus();
      }, 50);
    }
  };

  const handleEditNumber = () => {
    setStep("email");
    setOtp("");
    setOtpDigits(["", "", "", ""]);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SECTION */}
      <div className="flex items-center justify-center px-6 md:px-10 bg-gray-50 relative">
        <div className="absolute left-10 top-10">
          <img src={Logo} alt="Logo" className="h-8" />
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Login To Your Account
          </h2>

          {/* STEP 1 */}
          {step === "email" && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  maxLength="10"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 
                  focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="Enter registered mobile number"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-100 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2.5 text-sm rounded-lg 
                font-semibold hover:bg-green-800 transition"
              >
                Send OTP
              </button>

              <p className="text-sm text-gray-600 text-center">
                Don’t have an account?{" "}
                <span className="text-green-700 font-semibold cursor-pointer">
                  Register
                </span>
              </p>
            </form>
          )}

          {/* STEP 2 */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Enter OTP
                </label>

                <div className="flex items-center justify-between gap-2">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        const newOtp = [...otpDigits];
                        newOtp[index] = value;
                        setOtpDigits(newOtp);

                        if (value && index < 3) {
                          document.getElementById(`otp-${index + 1}`).focus();
                        }

                        setOtp(newOtp.join(""));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
                          document.getElementById(`otp-${index - 1}`).focus();
                        }
                      }}
                      className="w-16 h-16 text-center border border-gray-300 rounded-lg 
                      text-lg font-semibold focus:ring-1 focus:ring-green-600"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-gray-500">
                    OTP sent to <span className="font-medium">{email}</span>
                  </p>

                  <p
                    onClick={handleEditNumber}
                    className="text-xs text-red-600 font-medium cursor-pointer"
                  >
                    Edit Number
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2.5 text-sm rounded-lg 
                font-semibold hover:bg-green-800 transition"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden md:flex flex-col justify-between bg-green-900 text-white p-10">
        <div className="flex justify-end text-sm opacity-80 cursor-pointer">💬 Support</div>

        <div className="bg-green-800/50 backdrop-blur-xl rounded-2xl p-6 max-w-sm">
          <h3 className="text-xl font-semibold mb-2">Reach financial goals faster</h3>
          <p className="text-sm text-green-100 mb-4">
            Use your Venus card with no hidden fees. Hold, transfer, spend money.
          </p>
          <button className="bg-white text-green-900 px-4 py-2 rounded-lg text-sm font-medium">
            Learn more
          </button>
          <div className="mt-6 p-4 bg-green-950/40 rounded-xl">
            <p className="text-xs opacity-80">Earnings</p>
            <p className="text-lg font-bold">$350.40</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Introducing new features</h3>
          <p className="text-sm text-green-100 max-w-xs">
            Analyzing previous trends ensures better decisions.
          </p>
          <div className="mt-6 flex gap-4 opacity-70 text-xl">● ● ●</div>
        </div>
      </div>
    </div>
  );
}
