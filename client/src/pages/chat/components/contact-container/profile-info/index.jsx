import useAppStore from '@/store'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { getColor } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FiEdit2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { IoPowerSharp } from 'react-icons/io5'
import { apiClient } from '@/lib/api-client'
import { LOGOUT_ROUTE } from '@/utils/constants'

const ProfileInfo = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useAppStore();

    const LogOut = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
            if (response.status == 200) {
                navigate('/auth');
                setUserInfo(null)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]'>
            <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {userInfo.image ? (
                            <AvatarImage
                                src={`http://localhost:8747/${userInfo.image}`}
                                alt="profile"
                                className="object-cover w-full h-full bg-black rounded-full"
                            />
                        ) : (
                            <div
                                className={`uppercase w-12 h-12 text-lg border-[3px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}
                            >
                                {userInfo.firstName
                                    ? userInfo.firstName.split("").shift()
                                    : userInfo.email.split("").shift()}
                            </div>
                        )}
                    </Avatar>
                </div>
                <div className="">
                    {
                        userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
                    }
                </div>
            </div>
            <div className="flex gap-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiEdit2 className='text-orange-600 text-xl font-medium' onClick={() => navigate('/profile')} />
                        </TooltipTrigger>
                        <TooltipContent className='bg-[#1c1b1e] border-none text-white'>Edit Profile
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <IoPowerSharp className='text-red-600 text-xl font-medium' onClick={LogOut} />
                        </TooltipTrigger>
                        <TooltipContent className='bg-[#1c1b1e] border-none text-white'>Log Out
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default ProfileInfo