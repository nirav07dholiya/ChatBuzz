import React, { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import useAppStore from "@/store";

const NewDM = () => {
    const { setSelectedChatType, setSelectedChatData,selectedChatType } = useAppStore();
    const [openNewContactModel, setOpenNewContactModel] = useState(false);
    const [searchedContact, setSearchedContact] = useState([]);

    const searchContact = async (searchTerm) => {
        try {
            if (searchTerm.length > 0) {
                const response = await apiClient.post(
                    SEARCH_CONTACTS_ROUTES,
                    { searchTerm },
                    { withCredentials: true }
                );
                if (response.status == 200 && response.data.contacts) {
                    setSearchedContact(response.data.contacts);
                }
            } else {
                setSearchedContact([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const selectNewContact = (contact) => {
        setOpenNewContactModel(false)
        setSelectedChatType("contact")
        setSelectedChatData(contact)
        setSearchedContact([])
    }

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300"
                            onClick={() => setOpenNewContactModel(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                        Select New Contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please select a contact </DialogTitle>
                    </DialogHeader>
                    <div className="">
                        <Input
                            placeholder="Search contacts"
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => searchContact(e.target.value)}
                        />
                    </div>
                    {
                        searchedContact.length > 0 ? (
                            <ScrollArea className="h-[250px]">
                                <div className="flex flex-col gap-5">
                                    {searchedContact.map((contact) => (
                                        <div
                                            key={contact._id}
                                            className="flex gap-3 items-center cursor-pointer"
                                            onClick={() => selectNewContact(contact)}
                                        >
                                            <div className="w-12 h-12 relative">
                                                <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                                    {contact.image ? (
                                                        <AvatarImage
                                                            src={`http://localhost:8747/${contact.image}`}
                                                            alt="profile"
                                                            className="object-cover w-full h-full bg-black rounded-full"
                                                        />
                                                    ) : (
                                                        <div
                                                            className={`uppercase w-12 h-12 text-lg border-[3px] flex items-center justify-center rounded-full ${getColor(
                                                                contact.color
                                                            )}`}
                                                        >
                                                            {contact.firstName
                                                                ? contact.firstName.split("").shift()
                                                                : contact.email.split("").shift()}
                                                        </div>
                                                    )}
                                                </Avatar>
                                            </div>
                                            <div className="flex flex-col">
                                                <span>
                                                    {contact.firstName && contact.lastName
                                                        ? `${contact.firstName} ${contact.lastName}`
                                                        : ""}
                                                </span>
                                                <span className="text-xs">{contact.email}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        ) : ""
                    }

                    {searchedContact.length <= 0 && (
                        <div className="flex-1 md:flex flex-col justify-center items-center duration-1000 transition-all mt-10">
                            <Lottie
                                isClickToPauseDisabled={true}
                                height={120}
                                width={120}
                                options={animationDefaultOptions}
                            />
                            <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-8 lg:text-2xl text-xl transition-all duration-300 text-center">
                                <h3 className="Helvetica">
                                    Hi<span className="text-orange-500 ">!</span> Search new
                                    <span className="text-orange-500 "> Contact. </span>
                                </h3>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NewDM;
