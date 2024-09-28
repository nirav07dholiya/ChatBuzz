export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    directMessageContacts:[],
    isUploading:false,
    isDownloading:false,
    fileUploadProgress:0,
    fileDownloadProgress:0,
    channels:[],
    setChannels:(channels)=>set({channels}),
    setIsUploading:(isUploading)=>set({isUploading}),
    setIsDownloading:(isDownloading)=>({isDownloading}),
    setFileUploadProgress:(fileUploadProgress)=>({fileUploadProgress}),
    setFileDownloadProgress:(fileDownloadProgress)=>({fileDownloadProgress}),
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages) =>
        set({ selectedChatMessages }),
    setDirectMessageContacts:(directMessageContacts)=>set({directMessageContacts}),
    addChannel:(channel)=>{
        const channels = get().channels;
        set({channels:[channel,...channels]});
    },
    closeChat: () =>
        set({
            selectedChatType: undefined,
            selectedChatData: undefined,
            selectedChatMessages: [],
        }),
    addMessage: (message) => {
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages: [
                ...selectedChatMessages,
                {
                    ...message,
                    recipient:
                        selectedChatType === "channel"
                            ? message.recipient
                            : message.recipient._id,
                    sender:
                        selectedChatType === "channel"
                            ? message.sender
                            : message.sender._id,
                },
            ],
        });
    },
});
