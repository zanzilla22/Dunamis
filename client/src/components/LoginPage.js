import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameFirst, setNameFirst] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [error, setError] = useState("");
  const api_base = 'https://dunamis-api.vercel.app';
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const redirectToDashboard = {
        student: '/student',
        teacher: '/teacher',
        coOpRepresentative: '/co-op-manager',
      };
      const dashboardPath = redirectToDashboard[currentUser.role] || '/';
      navigate(dashboardPath);
    }
  }, [currentUser, navigate]);

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const adjustedRole = {
      'student': 'student',
      'teacher': 'teacher',
      'coOpRepresentative': 'coOpRepresentative',
    }[userRole];

    try {
      if (!isLogin) {
        const url = `${api_base}/${userRole}/register`;
        const payload = { email, password, nameFirst, nameLast };
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          const data = await response.json();
          if (response.ok) {
            console.log('Success:', data);
          } else {
            throw new Error(data.message || 'An error occurred during authentication.');
          }
        } catch (error) {
          setError(error.response?.data?.error || error.message);
          console.error('Authentication Error:', error);
        }
      }
      await login(email, password, adjustedRole);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || error.message);
      console.error('Authentication Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <img src="/dunamis-logo.png" alt="Dunamis Logo" className="block mx-auto mb-8 max-w-full h-auto"/>
        <h1 className="font-sans text-blue-500 text-center text-4xl font-bold mb-8" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
          {isLogin ? 'Login' : 'Register'}
        </h1>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <input type="text" placeholder="First Name" value={nameFirst} onChange={(e) => setNameFirst(e.target.value)} className="w-full p-2 mt-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <input type="text" placeholder="Last Name" value={nameLast} onChange={(e) => setNameLast(e.target.value)} className="w-full p-2 mt-2 border border-gray-300 rounded-md" />
              </div>
            </>
          )}
          <div className="mb-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mt-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mt-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
          <select value={userRole} onChange={handleRoleChange} required className="w-full p-2 mt-2 border border-gray-300 rounded-md text-gray-800 bg-white">
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="coOpRepresentative">Co-Op Representative</option>
          </select>

          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 rounded-md text-uppercase block w-full hover:bg-orange-500 transition-colors">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-4">
          <GoogleLogin
            clientId="your_client_id.apps.googleusercontent.com"
            buttonText={isLogin ? 'Login with Google' : 'Register with Google'}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="google-login"
          />
        </div>
        <button className="mt-4 underline text-gray-800 hover:text-gray-600 transition-colors text-center w-full" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need to register?' : 'Already registered?'}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
