'use client';

import { setUser } from "@/store/userReducer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SessionCheck({ children }) {
  let dispatch = useDispatch();
  let router = useRouter();
  let [isChecking, setIsChecking] = useState(true); // Keep track of loading state
  let [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(function () {
    let meraToken = localStorage.getItem("ckey");

    // If there is genuinely no token, send them to login
    if (!meraToken) {
      router.push("/login");
      return;
    }

    // Ask backend who this token belongs to
    axios
      .post("/api/auth", {
        type: "sessionCheckKaro",
        key: meraToken,
      })
      .then(function (resp) {
        if (resp.data && resp.data._id) {
          // Restore user into Redux!
          dispatch(setUser(resp.data));
          setIsAuthorized(true);
        } else {
          router.push("/login");
        }
      })
      .catch(function (err) {
        console.log("Session invalid or expired", err);
        localStorage.removeItem("ckey");
        router.push("/login");
      })
      .finally(function () {
        setIsChecking(false); // Finished checking
      });
  }, [dispatch, router]);

  
  if (isChecking) {
    return <div>Loading session...</div>;
  }

  return <>{isAuthorized ? children : null}</>;
}