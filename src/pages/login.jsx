import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loding, setLoding] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(username)
        console.log(password)
    }
    return (
        <div className="flex flex-col items-center w-fall animate-fade-in">
            <h1 className="font-bold text-[16px] mb-4 text-center">
                Login with your looom acount
            </h1>
            < from onSubmit={handleLogin} className="w-full space-y-z">
                <Input type="text"
                    placeholder="username,phone or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    classname="w-full h-14 px-4 py-4 rounded-log focus-visible:ring-0 focus:border-black/40 transition-color duration-200 "
                />
                <Input type="password"
                    placeholder="*************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    classname="w-full h-14 px-4 py-4 rounded-log focus-visible:ring-0 focus:border-black/40 transition-color duration-200 " 
                    />
                    <Button type="Submit" disbled={loding} className="w-full h-14 p-4 rounded-lg bg-black/80 text-gray-400 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
                    {loding?'Logging in...':'Login'}
                    </Button>
                </from>
                <div className="mt-4 text-center">
                   <a href="#" className="text-sm text-gray-500 hover:underline">
                    Forget Password
                    </a> 
                </div >
                <div className="w-full flex items-center justify-center my-6">
                     <div className=" h-px bg-gray-700 grow"></div>
                <span className="px-4 text-gray-700 text-sm">or</span>
                <div className="h-px bg-gray-700 grow"></div>
                </div>
                <div className="w-full text-center">
                    <link to="/register" className=""></link>
                    <Button varient="seconadry" type="button" className="w-full h-14 p-4 rounded-lg border border-black/20 bg-white hover:border-black-60 cursor-pointer hover:bg-white text-black">
                        Create an acount
                    </Button>
                </div>
        </div>
    );
};

export default Login;