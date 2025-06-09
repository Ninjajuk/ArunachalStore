import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { resetPasswordRequest } from '../../../API/authAPI';

export default function ForgotPasswordRequest() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mailsent, setMailsent] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await resetPasswordRequest(data);

      if (!response) {
        setError('Failed to send reset password email. Please try again.');
      } else {
        setMailsent(true);
      }
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:shadow-3xl">
        <div className="text-center">
          {mailsent ? (
            <>
              <h1 className="text-3xl font-bold text-purple-700 mb-4">
                Email Sent Successfully
              </h1>
              <p className="text-gray-600">
                Please check your email for further instructions to reset your password.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-purple-700 mb-4">
                Reset Your Password
              </h2>
              <p className="text-gray-600">
                Enter your email address to receive a password reset link.
              </p>
            </>
          )}
        </div>

        {!mailsent && (
          <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        )}

        {mailsent ? (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Didn't receive the email?{" "}
              <button
                onClick={handleSubmit(onSubmit)}
                className="text-purple-700 hover:text-purple-900 font-medium transition-all"
              >
                Resend
              </button>
            </p>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-purple-700 hover:text-purple-900 font-medium transition-all"
              >
                Login
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}