import React, { useState } from "react";
import { useUser } from "../../Provider/UserProvider";
import { useNavigate, Link } from "react-router-dom";
import RegisterImage from '../../assets/images/registration.png'
import mainLogo from '../../assets/images/logo.svg'
import GoogleImage from '../../assets/images/google.svg'
import AxiosInstance from "../AxiosInstance";



const Register = () => {
  const { setUser, storeTokens } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Minimum 8 characters required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      setLoading(true);
      setErrors({}); // reset errors

      try {
        const response = await AxiosInstance.post("/auth/register/", {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          password_confirm: formData.confirmPassword,
        });

        const { user, tokens } = response.data;

        // Set user and store tokens
        storeTokens(tokens.access, tokens.refresh);
        setUser(user);

        // Navigate on success
        navigate("/feed", { replace: true });
      } catch (error) {
          // Extract a readable message
          let message = "Registration failed";

          if (error.response?.data) {
            const data = error.response.data;
            
            if (typeof data === "string") message = data;
            else if (data.detail) message = data.detail;
            else if (data.email) message = data.email[0]; // if validation error on email
            else if (data.password) message = data.password[0];
          }
        setErrors({ general: message });
      } finally {
        setLoading(false);
      }
    };



  return (
    <div className="_social_registration_wrapper flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left Image Section */}
        <div className="flex justify-center items-center">
          <img src={RegisterImage} alt="Registration Illustration" className="w-full h-auto" />
        </div>

        {/* Right Form Section */}
        <div className="_social_registration_content" style={{ width: '70%', maxWidth: '430px' }}>
          <div className="_right_logo mb-6">
            <img src={mainLogo} alt="Logo" className="w-full"/>
          </div>
          <h2 className="_social_registration_content_title mt-3">Get Started Now</h2>
          <p className="_social_registration_content_para mb-6">Registration</p>


          <button 
            type="button"
            className="_social_login_content_btn _mar_b30"
            style={{ width: '100%' }}
          >
            <img 
              src={GoogleImage}
              alt="Google" 
              className="_google_img" 
            />
            <span>Sign-in with google</span>
          </button>

          {/* Divider */}
          <div className="_social_login_content_bottom_txt _mar_b30">
            <span>Or</span>
          </div>

          {errors.general && (
            <div className="error-message general-error mb-4">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="_social_registration_label _mar_b10">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="_social_registration_input w-full px-2 hover:border-blue-300"
              disabled={loading}
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>

          <div>
            <label className="_social_registration_label _mar_b10">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="_social_registration_input w-full px-2 hover:border-blue-300"
              disabled={loading}
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>


            <div>
              <label className="_social_registration_label _mar_b10">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="_social_registration_input w-full px-2 hover:border-blue-300"
                disabled={loading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>


            <div>
              <label className="_social_registration_label _mar_b10">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="_social_registration_input w-full px-2 hover:border-blue-300"
                disabled={loading}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>


            <div>
              <label className="_social_registration_label _mar_b10">
                Repeat Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="_social_registration_input w-full px-2 hover:border-blue-300"
                disabled={loading}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <div className="flex items-center mt-2 mb-4">
              <input
                type="checkbox"
                className="_social_registration_form_check_input"
                id="terms"
              />
              <label htmlFor="terms" className="_social_registration_form_left_para ml-2">
                I agree to terms & conditions
              </label>
            </div>

            <button
              type="submit"
              className="_btn1 _mar_b30"
              disabled={loading}
            >
              <span>{loading ? "Creating Account..." : "Login"}</span>
            </button>
          </form>

          <div className=" _text_center mt-6">
            <p className="_social_registration_bottom_txt_para text-center">
              Already Have an account?{" "}
              <Link to="/" className="text-blue-500">
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
