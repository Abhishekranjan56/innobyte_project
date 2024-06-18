import React from "react";
import { UserRegisteration } from "./register/UserRegisteration";
import "./globals.css"; 

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
     <UserRegisteration/>
    </div>
  );
}
