import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const SubmitHandler = async (values) => {
    console.log("Form Submitted with values:", values);

    try {
      setLoading(true);

      await axiosInstance.post("/user/register", values);

      message.success("Registration Successful");
      console.log("Successful registration");

      navigate("/login");
    } catch (error) {
      console.log("Error Details:", error.response?.data);

      const backendMessage =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      message.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  // Prevent logged-in users from accessing the register page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}

        <div className="auth-box2">
          <div className="auth-form">
            <Form layout="vertical" onFinish={SubmitHandler}>
              <h1>Register Form</h1>

              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>

              <Form.Item label="Password" name="password">
                <Input type="password" />
              </Form.Item>

              <div className="d-flex justify-content-between">
                <Link to="/login">Already Register? Check Here to login</Link>

                <Button type="primary" htmlType="submit" loading={loading}>
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
