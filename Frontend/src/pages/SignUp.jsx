
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
    
//     // Validate inputs
//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       setIsLoading(false);
//       return;
//     }
    
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long.');
//       setIsLoading(false);
//       return;
//     }
    
//     try {
//       // Make API call to backend
//       const response = await axios.post('http://localhost:5000/api/signup', { 
//         email, 
//         password 
//       });
      
//       // Store token in localStorage
//       localStorage.setItem('token', response.data.token);
      
//       // Redirect to home/diagnosis page
//       navigate('/diagnosis');
      
//     } catch (err) {
//       console.error('Signup error:', err);
      
//       // Handle different error types
//       if (err.response) {
//         // Server responded with an error
//         if (err.response.status === 409) {
//           setError('This email is already registered. Please use a different email or login.');
//         } else if (err.response.data && err.response.data.error) {
//           setError(err.response.data.error);
//         } else {
//           setError('An error occurred during signup. Please try again.');
//         }
//       } else if (err.request) {
//         // Request was made but no response
//         setError('Cannot connect to the server. Please check your internet connection.');
//       } else {
//         // Something else went wrong
//         setError('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center text-indigo-800 mb-6">Sign Up</h1>
        
//         {error && (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-gray-700" htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-200"
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700" htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-200"
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700" htmlFor="confirm-password">Confirm Password</label>
//             <input
//               type="password"
//               id="confirm-password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-200"
//             />
//           </div>
          
//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Signing Up...' : 'Sign Up'}
//           </button>
//         </form>
        
//         <p className="mt-4 text-center">
//           Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { 
        email, 
        password 
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', email);
      
      navigate('/diagnosis');
      
    } catch (err) {
      console.error('Signup error:', err);
      
      if (err.response) {
        if (err.response.status === 409) {
          setError('This email is already registered.');
        } else if (err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError('An error occurred during signup.');
        }
      } else if (err.request) {
        setError('Cannot connect to the server.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-indigo-800 mb-6">Sign Up</h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          
          <div>
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          
          <div>
            <label className="block text-gray-700" htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
