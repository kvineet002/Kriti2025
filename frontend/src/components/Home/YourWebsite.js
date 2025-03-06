import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

function YourWebsite() {

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : {};
  const email = decodedToken && decodedToken.email;
  const [deployedWebsites, setDeployedWebsites] = useState([]);
  useEffect(() => {
    const fetchDeployedWebsites = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/deploys/get/${email}`);
        
        setDeployedWebsites(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDeployedWebsites();
  }, []);


  return (
    <div className='mb-10'>
      <div className='text-white flex gap-1 items-center text-1xl font-bold my-10'>
        Your Deployed Websites
        <img src='/right-arrow.svg' width={18} alt='' />
      </div>
      <div className='flex overflow-x-auto no-scrollbar gap-4'>
        {deployedWebsites&&deployedWebsites.map((website, index) => (
          <a
            key={index}
            href={website.websiteLink}
            target='_blank'
            className='border-[1px] border-white border-opacity-10 rounded-lg h-[250px] w-[250px] flex-shrink-0 hover:bg-gradient-to-br hover:from-black hover:via-transparent hover:to-black z-10'
          >
            <img src={website.websiteImage} className='w-full h-[200px] object-cover rounded-t-lg -z-10 ' alt='' />
            <div className='text-white bg-white bg-opacity-5 px-4 py-3 flex justify-between text-opacity-75 items-center'>
             {website.websiteName}
              <img src='/right-arrow.svg' className='w-3 h-3 opacity-60' alt='' />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default YourWebsite;