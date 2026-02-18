import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useNavigate } from "react-router-dom";
import { registerUser } from '@/services/auth.service';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await registerUser({ username, password });
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      <h1 className="font-bold text-[16px] mb-4 text-center">
        Create an account with Looom
      </h1>

      <form onSubmit={handleRegister} className="w-full space-y-2">


        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full h-14 px-4 py-4 rounded-lg focus-visible:ring-0 focus:border-black/40 transition-colors duration-200"
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-14 px-4 py-4 rounded-lg focus-visible:ring-0 focus:border-black/40 transition-colors duration-200"
        />

        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full h-14 px-4 py-4 rounded-lg focus-visible:ring-0 focus:border-black/40 transition-colors duration-200"
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errorMessage}
          </p>
        )}
        <Button type="submit" disabled={loading} className="w-full h-14 px-4 py-4 rounded-lg bg-black/80 text-gray-400 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
          {loading ? 'Creating account...' : 'Sign up'}
        </Button>
      </form>


      <div className="w-full flex items-center justify-center my-6">
        <div className="h-px bg-gray-700 grow"></div>
        <span className="px-4 text-gray-700 text-sm">or</span>
        <div className="h-px bg-gray-700 grow"></div>
      </div>

      <div className="w-full text-center">
        <p className="text-gray-500 text-sm mb-2">Already have an account?</p>
        <Link to="/login" className="w-full block">
          <Button
            variant="secondary"
            type="button"
            className="w-full h-14 px-4 py-4 rounded-lg border border-black/40 bg-white hover:bg-white hover:border-black/60 cursor-pointer"
          >
            Log in
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;