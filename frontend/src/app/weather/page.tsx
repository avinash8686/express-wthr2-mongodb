"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Temperature from "@/components/Temperature";
import Forecast from "@/components/Forecast";

export default function Weather() {
  const [weeklyForecast, setWeeklyForeCast] = useState<any>();

  const [cords, setCords] = useState<any>();
  const [cordsErr, setCordsErr] = useState<any>();

  function getLocation() {
    if (navigator.geolocation) {
      console.log("inside geo location");
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setCordsErr("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position: any) {
    console.log("position", position);
    setCords(`${position.coords.latitude},${position.coords.longitude}`);
  }

  function showError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setCordsErr("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setCordsErr("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setCordsErr("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setCordsErr("An unknown error occurred.");
        break;
    }
  }

  useEffect(() => {
    getLocation();
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
        {cordsErr && (
          <Box className="frost-effect">
            <Text fontSize={"4xl"} color="White" fontWeight={"bold"}>
              {" "}
              Unable to find the location :(
            </Text>
          </Box>
        )}
        {cords && (
          <Temperature
            setWeeklyForeCast={setWeeklyForeCast}
            cords={cords}
            cordsErr={cordsErr}
          />
        )}
        {weeklyForecast && <Forecast weeklyForecast={weeklyForecast} />}
      </Flex>
    </>
  );
}
