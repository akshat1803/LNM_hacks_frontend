import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PatientProfile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      aadhaarNumber: ''
    },
    medicalInfo: {
      height: '',
      weight: '',
      allergies: '',
      chronicConditions: '',
      medications: ''
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/patient/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfileData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Profile fetch failed');
        setIsLoading(false);
        navigate('/login');
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/patient/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      alert('Profile Updated Successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl">
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Patient Profile</h2>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-x-4">
              <button 
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <section>
            <h3 className="text-2xl font-semibold text-blue-600 mb-6">Personal Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={profileData.personalInfo.firstName}
                onChange={(e) => handleChange(e, 'personalInfo')}
                disabled={!isEditing}
                className={`w-full p-3 border rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                required
              />
              {/* Additional input fields */}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default PatientProfile;