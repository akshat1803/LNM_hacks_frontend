import { useState, useEffect } from 'react';
import baseURL from './base';

function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch doctor profile
        const profileResponse = await baseURL.get('/api/doctor/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDoctorProfile(profileResponse.data);

        // Fetch assigned patients
        const patientsResponse = await baseURL.get('/api/doctor/patients', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPatients(patientsResponse.data);

        // Fetch upcoming appointments
        const appointmentsResponse = await baseURL.get('/api/doctor/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      
      {doctorProfile && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Dr. {doctorProfile.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="font-medium">Specialization:</p>
              <p>{doctorProfile.specialization}</p>
            </div>
            <div>
              <p className="font-medium">Department:</p>
              <p>{doctorProfile.department}</p>
            </div>
            <div>
              <p className="font-medium">Contact:</p>
              <p>{doctorProfile.email}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patients Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">My Patients</h3>
          <div className="space-y-3">
            {patients.map(patient => (
              <div 
                key={patient.id} 
                className="border-b pb-3 last:border-b-0 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-gray-600 text-sm">{patient.condition}</p>
                </div>
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {appointments.map(appointment => (
              <div 
                key={appointment.id} 
                className="border-b pb-3 last:border-b-0 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{appointment.patientName}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(appointment.date).toLocaleString()}
                  </p>
                </div>
                <span 
                  className={`px-3 py-1 rounded ${
                    appointment.status === 'Pending' 
                      ? 'bg-yellow-200 text-yellow-800' 
                      : 'bg-green-200 text-green-800'
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;