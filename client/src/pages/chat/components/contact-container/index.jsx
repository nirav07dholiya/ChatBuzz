import logo from '@/assets/images/chatBuzzPng.png'
import NewDM from './new-dm';//
import ProfileInfo from './profile-info';
import { useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { GET_CONTACTS_FOR_DM } from '@/utils/constants';
import useAppStore from '@/store';
import ContactList from '@/components/contact-list';

const ContactContainer = () => {

  const {setDirectMessageContacts,directMessageContacts}=useAppStore();

  useEffect(()=>{
    const getContacts = async()=>{
      const response = await apiClient.get(GET_CONTACTS_FOR_DM,{withCredentials:true})
      if (response.data.contacts) {
        setDirectMessageContacts(response.data.contacts);
      }
    }
    getContacts()
  },[setDirectMessageContacts])

  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
      <div className='pl-5'>
        <Logo/>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="direct messages"/>
          <NewDM/>
        </div>
        <div className="max-h-[30vh] overflow-y-auto scrollbar-hide">
          <ContactList contacts={directMessageContacts}/>
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="channels"/>
        </div>
      </div>
      <ProfileInfo/>
    </div>
  )
}

export default ContactContainer;

const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <img src={logo} alt="logo" width={60}/>
      <span className="text-3xl font-semibold ">ChatBuzz</span>
    </div>
  );
};

const Title = ({text})=>{
  return(
    <h6 className='uppercase tracking-widest text-netural-400 pl-10 font-light text-opacity-90 text-sm'>{text}</h6>
  )
}