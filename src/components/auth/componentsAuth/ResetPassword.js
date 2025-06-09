import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { resetPassword } from '../../../API/authAPI';
import EmailFailedResetPasswrod from './EmailFailedveri';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');
  const email = query.get('email');
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notifyAdd = () => toast.success('Password Reset Successfully!');

  const onSubmit = async (data) => {
    setBtnLoading(true);
    try {
      const requestData = {
        email: email,
        password: data.password,
        token: token,
      };

      const response = await resetPassword(requestData);

      if (response) {
        notifyAdd();
        navigate('/login'); // Redirect to login page
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while resetting the password.');
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      {email && token ? (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 flex justify-center items-center min-h-screen">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:shadow-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-purple-700 mb-4">
                Reset Your Password
              </h2>
              <p className="text-gray-600">
                Enter a new password for your account.
              </p>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* New Password Field */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message:
                        'Password must be at least 8 characters, contain 1 uppercase letter, 1 lowercase letter, and 1 number.',
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter new password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value, formValues) =>
                      value === formValues.password || 'Passwords do not match',
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={btnLoading}
                  className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  {btnLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Remember your password?{' '}
                <Link
                  to="/login"
                  className="text-purple-700 hover:text-purple-900 font-medium transition-all"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <EmailFailedResetPasswrod />
      )}
    </>
  );
}