"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "react-toastify";

export function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryEmail = searchParams.get("email");
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [searchParams]);

  const handleVerify = async (e) => {
    e.preventDefault();

    const data = { otp, email };
    console.log(data);

    try {
      const response = await fetch("http://localhost:3000/users/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("OTP verified successfully");
        alert("OTP verified successfully");

        // Navigate to home and pass the payload
        const queryParams = new URLSearchParams({ email }).toString();
        router.push(`/home?${queryParams}`);
      } else {
        toast.error(result.message || "OTP verification failed");
        alert(result.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error("An error occurred");
      alert("An error occurred");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Verify OTP</CardTitle>
        <CardDescription>
          Enter the OTP sent to your email to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleVerify} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <CardFooter className="p-0">
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
