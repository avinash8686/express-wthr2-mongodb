"use client";
import React, { useState, useEffect } from "react";
import { Flex, Box, List, ListItem, ListIcon } from "@chakra-ui/react";
// import { blogForm } from "@/utils/forms/blogForm";
import { userForm } from "@/utils/forms/userForm";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import Sidebar from "@/components/Sidebar";
import Temperature from "@/components/Temperature";
import ProfileBlock from "@/components/ProfileBlock";

const Profile = ({}) => {
  const [userData, setUserData] = useState<any>();

  const getUserData = async () => {
    const accessToken = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:5000/api/user/", {
        headers: {
          "auth-token": accessToken,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Get the userData & fill it in the form
  // User can only change the name & password, can't change the email

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Flex
        maxW="1240px"
        mx="auto"
        my="12"
        gap={4}
        justifyContent={"space-between"}
      >
        <Sidebar />
        <ProfileBlock userData={userData} />
      </Flex>
    </>
  );
};

export default Profile;
