import { useState } from 'react';
import baseURL from './base';
import { useNavigate } from 'react-router-dom';

function DoctorRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    specialization: '',
    licenseNumber: '',
    experience: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, specialization, licenseNumber, experience } = formData;
    
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!specialization.trim()) return 'Specialization is required';
    if (!licenseNumber.trim()) return 'License number is required';
    if (parseInt(experience) < 0) return 'Invalid experience';

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      await baseURL.post('/api/doctors/login', formData);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Doctor Registration
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-2 rounded-md transition duration-300 ease-in-out 
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account? 
            <span 
              onClick={() => navigate('/')} 
              className="text-blue-600 hover:underline ml-2 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorRegister;