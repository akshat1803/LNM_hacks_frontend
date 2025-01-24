import  { useState } from 'react';
import axios from 'axios';
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
 const navigate = useNavigate();

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData(prevState => ({
     ...prevState,
     [name]: value
   }));
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await axios.post('/api/register/doctor', formData);
     navigate('/');
   } catch (error) {
     console.error('Registration failed', error);
     alert('Registration failed');
   }
 };

 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
     <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
       <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
         Doctor Registration
       </h2>
       
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
           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
         >
           Register
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