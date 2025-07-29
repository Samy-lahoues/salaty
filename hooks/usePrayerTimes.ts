"use client";
import { useState, useEffect } from "react";
import { CITIES, city } from "@/constants";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface DateInfo {
  gregorian: {
    date: string;
    weekday: { en: string; ar: string };
    month: { en: string; ar: string };
    day: string;
    year: string;
  };
  hijri: {
    date: string;
    weekday: { en: string; ar: string };
    month: { en: string; ar: string };
    day: string;
    year: string;
  };
}

export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<city | null>(
    CITIES[0] || null,
  );
  const [calculationMethod, setCalculationMethod] = useState("2");
  const [dateInfo, setDateInfo] = useState<DateInfo | null>(null); // Fixed naming convention
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [useGPS, setUseGPS] = useState(false);

  const fetchPrayerTimes = async (lat: number, lng: number) => {
    // Validate coordinates
    if (
      typeof lat !== "number" ||
      typeof lng !== "number" ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      setError("Invalid coordinates provided");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${calculationMethod}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: Failed to fetch prayer times`,
        );
      }

      const data = await response.json();

      // Validate API response structure
      if (!data?.data?.timings || !data?.data?.date) {
        throw new Error("Invalid API response structure");
      }

      setPrayerTimes(data.data.timings);
      setDateInfo(data.data.date);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(`Failed to load prayer times: ${errorMessage}`);
      console.error("Error fetching prayer times:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setUseGPS(true);
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        fetchPrayerTimes(latitude, longitude);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        setError(errorMessage + " Please select a city manually.");
        setUseGPS(false);
        setLoading(false);
      },
      {
        timeout: 10000, // 10 second timeout
        enableHighAccuracy: true,
        maximumAge: 300000, // 5 minutes cache
      },
    );
  };

  const handleMethodChange = (method: string) => {
    setCalculationMethod(method);
    localStorage.setItem("method", JSON.stringify(method));
    if (useGPS && currentLocation) {
      fetchPrayerTimes(currentLocation.lat, currentLocation.lng);
    } else if (selectedCity) {
      fetchPrayerTimes(selectedCity.lat, selectedCity.lng);
    }
  };

  const handleCityChange = (cityName: string) => {
    const city = CITIES.find((c) => c.name === cityName);

    if (!city) {
      setError(`City "${cityName}" not found`);
      return;
    }

    setSelectedCity(city);
    setUseGPS(false);
    setCurrentLocation(null);
    fetchPrayerTimes(city.lat, city.lng);
  };

  const handleRefresh = () => {
    if (useGPS && currentLocation) {
      fetchPrayerTimes(currentLocation.lat, currentLocation.lng);
    } else if (selectedCity) {
      fetchPrayerTimes(selectedCity.lat, selectedCity.lng);
    } else {
      setError("No location selected for refresh");
    }
  };
  // Render calculation method that has been choosed before
  useEffect(() => {
    const storedMethod = JSON.parse(localStorage.method || "2");
    setCalculationMethod(storedMethod);
  }, []);

  // Fixed useEffect with proper dependency array
  useEffect(() => {
    if (selectedCity && !useGPS) {
      fetchPrayerTimes(selectedCity.lat, selectedCity.lng);
    }
  }, [calculationMethod]); // Only run when calculation method changes

  // Initial load effect
  useEffect(() => {
    if (selectedCity) {
      fetchPrayerTimes(selectedCity.lat, selectedCity.lng);
    }
  }, []); // Run only once on mount

  return {
    prayerTimes,
    error,
    loading,
    selectedCity,
    calculationMethod,
    dateInfo,
    cities: CITIES,
    currentLocation,
    useGPS,
    getCurrentLocation,
    handleMethodChange,
    handleCityChange,
    handleRefresh,
    setError, // Export setError for manual error clearing
  };
};
