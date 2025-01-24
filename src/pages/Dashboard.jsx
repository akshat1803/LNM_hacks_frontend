import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
 const [userData, setUserData] = useState(null);
 const navigate = useNavigate();

 useEffect(() => {
   const fetchUserData = async () => {
     try {
       const token = localStorage.getItem('token');
       if (!token) {
         navigate('/login');
         return;
       }

       const response = await axios.get('/api/user/profile', {
         headers: { Authorization: `Bearer ${token}` }
       });
       setUserData(response.data);
     } catch (error) {
       console.error('Failed to fetch user data', error);
       navigate('/login');
     }
   };

   fetchUserData();
 }, [navigate]);

 const handleLogout = () => {
   localStorage.removeItem('token');
   navigate('/login');
 };

 if (!userData) return (
   <div className="min-h-screen flex items-center justify-center">
     <div className="text-xl font-semibold">Loading...</div>
   </div>
 );

 return (
   <div className="min-h-screen bg-gray-100 py-10 px-4">
     <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-3xl font-bold text-gray-800">
           Welcome, {userData.firstName} {userData.lastName}
         </h2>
         <button 
           onClick={handleLogout}
           className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
         >
           Logout
         </button>
       </div>
       
       {userData.userType === 'patient' && (
         <div className="bg-blue-50 p-6 rounded-lg">
           <h3 className="text-xl font-semibold text-blue-800 mb-4">Patient Details</h3>
           <div className="space-y-2">
             <p className="text-gray-700"><strong>Age:</strong> {userData.age}</p>
             <p className="text-gray-700"><strong>Gender:</strong> {userData.gender}</p>
             <p className="text-gray-700">
               <strong>Medical History:</strong> 
               {userData.medicalHistory || 'No medical history recorded'}
             </p>
           </div>
         </div>
       )}

       {userData.userType === 'doctor' && (
         <div className="bg-green-50 p-6 rounded-lg">
           <h3 className="text-xl font-semibold text-green-800 mb-4">Doctor Profile</h3>
           <div className="space-y-2">
             <p className="text-gray-700"><strong>Specialization:</strong> {userData.specialization}</p>
             <p className="text-gray-700"><strong>Experience:</strong> {userData.experience} years</p>
             <p className="text-gray-700"><strong>License Number:</strong> {userData.licenseNumber}</p>
           </div>
         </div>
       )}
     </div>
   </div>
 );
}

export default Dashboard;