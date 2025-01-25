import { useState } from 'react';
import baseURL from './base';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await baseURL.post('/api/login', {
        email,
        password,
        userType
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', userType);

      if (userType === 'patient') {
        const patientResponse = await baseURL.get('/api/patient/profile', {
          headers: { Authorization: `Bearer ${response.data.token}` }
        });
        
        navigate('/patient-profile', { 
          state: { patientData: patientResponse.data } 
        });
      } else if (userType === 'doctor') {
        const doctorResponse = await baseURL.get('/api/doctor/profile', {
          headers: { Authorization: `Bearer ${response.data.token}` }
        });
        
        navigate('/doctor-dashboard', { 
          state: { doctorData: doctorResponse.data } 
        });
      }
    } catch (error) {
      console.error('Login failed', error);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Medical Portal Login
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">User Type</label>
            <select 
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">New User?</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/register/patient')}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Patient Registration
            </button>
            <button
              onClick={() => navigate('/register/doctor')}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300"
            >
              Doctor Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;