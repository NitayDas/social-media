import React, { useState } from "react";
import { useUser } from "../../Provider/UserProvider";
import { useNavigate, Link } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";
import LoginImage from '../../assets/images/login.png';
import GoogleImage from '../../assets/images/google.svg'
import mainLogo from '../../assets/images/logo.svg'
import '../../assets/css/common.css';
import '../../assets/css/main.css'; // Import main.css



const Login = () => {
  const { setUser, storeTokens } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isDevelopment = import.meta.env.MODE === 'development';
const baseurl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_PROD;


  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  setErrors({});

  try {
    console.log("🔄 Sending login request with data:", formData);
    console.log("📡 API Base URL:", baseurl);
    
    const response = await AxiosInstance.post("auth/login/", formData);

    console.log("✅ Login successful! Response:", response.data);

    const { user, tokens } = response.data;
    
    console.log("💾 Storing tokens...");
    storeTokens(tokens.access, tokens.refresh);
    setUser(user);
    
    console.log("🚀 Navigating to feed...");
    navigate("/feed", { replace: true });
    
  } catch (error) {
    console.error("❌ Login failed!");
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    console.error("Error message:", error.message);
    
    // Check the actual request that was sent
    if (error.config) {
      console.error("Request URL:", error.config.url);
      console.error("Request headers:", error.config.headers);
      console.error("Request data:", error.config.data);
    }
    
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Login failed. Please check your credentials.";
    
    setErrors({ general: errorMessage });
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="_social_login_wrapper">
      {/* Background Shapes */}
      <div className="_shape_one">
        {/* Add your shape image or SVG here */}
      </div>
      <div className="_shape_two">
        {/* Add your shape image or SVG here */}
      </div>
      <div className="_shape_three">
        {/* Add your shape image or SVG here */}
      </div>

      <div className="_dis_flex_all">
        <div className="_flex_row" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Left Image Section */}
          <div className="_flex_auto _dis_flex_all" style={{ width: '50%', padding: '0 15px' }}>
            <div className="_dis_flex_all _flex_column">
              <div className="_left_logo _mar_b30">
                {/* Add your logo here */}
              </div>
              <div className="_left_img">
                <img src={LoginImage} alt="Login" />
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="_flex_auto _dis_flex_all" style={{ width: '50%', padding: '0 15px' }}>
            <div className="_social_login_content" style={{ width: '100%', maxWidth: '430px' }}>
              {/* Header */}
              <div className="_mar_b30">
                <img className="_left_logo" src={mainLogo} alt="" />
                <h2 className="_social_login_content_title _mar_b10 mt-3">Welcome back</h2>
                <p className="_social_login_content_para text-black">Login to your account</p>
              </div>

              {/* Google Sign-in Button */}
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

              {/* Error Message */}
              {errors.general && (
                <div className="_mar_b20" style={{ 
                  background: 'var(--color9)', 
                  color: 'var(--color5)', 
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: '1px solid var(--color5)',
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  {errors.general}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="_mar_b20">
                  <label className="_social_login_label _mar_b10">
                    Email
                  </label><br></br>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="_social_login_input px-2 hover:border-blue-300 w-full"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  {errors.email && (
                    <div className="_social_login_form_left_para" style={{ color: 'var(--color5)', margin: '5px 0 0 0' }}>
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="_mar_b20">
                  <label className="_social_login_label _mar_b10 px-2 hover:border-blue-300">
                    Password
                  </label><br />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="_social_login_input px-2 hover:border-blue-300 w-full"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  {errors.password && (
                    <div className="_social_login_form_left_para " style={{ color: 'var(--color5)', margin: '5px 0 0 0' }}>
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="_dis_flex _mar_b30" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="_dis_flex _dis_flex_cntr1 _social_login_form_check_label" style={{ gap: '8px' }}>
                    <input 
                      type="checkbox" 
                      className="_social_login_form_check_input"
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        border: '1px solid var(--bcolor2)',
                        borderRadius: '2px'
                      }} 
                    />
                    Remember me
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="_social_login_form_left_para"
                    style={{ 
                      textDecoration: 'none',
                      margin: '0'
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="_btn1 _mar_b30"
                  style={{ 
                    width: '100%',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? "Signing in..." : "Login now"}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="_text_center">
                <p className="_social_login_bottom_txt_para">
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    style={{ 
                      textDecoration: 'none'
                    }}
                  >
                    Create New Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;