import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const getToken = () => {
  return localStorage.getItem("token");
};
