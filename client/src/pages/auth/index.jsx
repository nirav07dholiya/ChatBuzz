import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import banner from "../../assets/images/banner.png";
import victory from "../../assets/images/victory.png";
import { toast } from "sonner";
import { apiClient } from "../../lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store";

const Auth = () => {

    const navigate = useNavigate();
    const { setUserInfo,setSelectedChatType } = useAppStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const validateAuth = () => {
        if (!email.length) {
            toast.error("Email is required.")
            return false;
        };
        if (!password.length) {
            toast.error("Password is required.")
            return false;
        }
        return true;
    }

    const handleLogin = async () => {
        if (validateAuth()) {
            const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
            console.log(response);

            if (response.data.user.id) {
                setUserInfo(response.data.user)
                if (response.data.user.profileSetup) {
                    navigate('/chat');
                }
                else {
                    navigate('profile');
                }
            }
        }
        setEmail("")
        setPassword("")
        setSelectedChatType(undefined)
    }

    const handleSignUp = async () => {
        if (validateAuth()) {
            if (password !== confirmPassword) {
                toast.error("Confirm password doesn't match with password.")
                return false;
            }

            const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
            console.log(response);

            if (response.status == 201) {
                setUserInfo(response.data.user);
                navigate('/profile');
            }
        }
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setSelectedChatType(undefined)
    }

    return (
        <>
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <div className="h-[80vh] border-2 bg-white border-white text-opacity-90 shadow-2xl w-[90vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
                    <div className="flex flex-col items-center justify-center gap-10">
                        <div className="flex items-center justify-center flex-col">
                            <div className="flex items-center justify-center gap-3">
                                <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                                <img src={victory} alt="" className="h-[70px]" />
                            </div>
                            <p className="font-medium text-center">
                                Fill in the details to get startedwith the best chat app!
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <Tabs defaultValue="login" className="w-3/4">
                                <TabsList className="bg-transparant w-full rounded-none ">
                                    <TabsTrigger
                                        value="login"
                                        className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:fonts-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                                    >
                                        Login
                                    </TabsTrigger>

                                    <TabsTrigger
                                        value="signup"
                                        className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:fonts-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                                    >
                                        Sign Up
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="login" className="flex flex-col gap-5 mt-5">
                                    <Input
                                        type="text"
                                        value={email}
                                        placeholder="email"
                                        className="rounded-full p-5 border-gray-300"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input
                                        type="password"
                                        value={password}
                                        placeholder="password"
                                        className="rounded-full p-5 border-gray-300"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button
                                        className="rounded-full p-6 text-white"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </Button>
                                </TabsContent>
                                <TabsContent value="signup" className="flex flex-col gap-5">
                                    <Input
                                        type="text"
                                        value={email}
                                        placeholder="email"
                                        className="rounded-full p-5 border-gray-300"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input
                                        type="password"
                                        value={password}
                                        placeholder="password"
                                        className="rounded-full p-5 border-gray-300"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Input
                                        type="password"
                                        value={confirmPassword}
                                        placeholder="confirm password"
                                        className="rounded-full p-5 border-gray-300"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <Button
                                        className="rounded-full p-6 text-white"
                                        onClick={handleSignUp}
                                    >
                                        Sign up
                                    </Button>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                    <div className="hidden xl:flex justify-center items-center ">
                        <img src={banner} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;
