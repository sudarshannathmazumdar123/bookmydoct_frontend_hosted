"use client";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "../ui/CustomButton";
import { Calendar, LogOut, Menu, TestTube, User } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const { user, logout, validateTokens } = useAuthStore();

  return (
    <>
      <article className="marquee">
        <p>
          You can book your appointment from the comfort of your home. For any
          enquiry or to book an appointment, call us at 9957052223 / 8822452046.
          For login or payment-related issues, feel free to reach out on the
          same numbers.
        </p>
      </article>
      <header className="px-4 lg:px-6 h-14 flex w-full items-center justify-between relative">
        <div className="flex w-full items-center max-lg:justify-between">
          <Link className="flex items-center max-md:justify-center" href="/">
            <Image
              src={"/logo.svg"}
              width={100}
              height={40}
              alt="logo"
              priority
              className="w-auto h-[50px]"
            />
          </Link>

          <nav className="hidden lg:flex ml-6 gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline hover:font-bold hover:text-primary underline-offset-8"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-sm font-medium hover:underline hover:font-bold hover:text-primary underline-offset-8"
              href="/aboutUs"
            >
              About Us
            </Link>
            <Link
              className="text-sm font-medium hover:underline hover:font-bold hover:text-primary underline-offset-8"
              href="/contact"
            >
              Contact Us
            </Link>
            <Link
              className="text-sm font-medium hover:underline hover:font-bold hover:text-primary underline-offset-8"
              href="/bookLabTest"
            >
              Book Lab Test
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center lg:hidden ">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <Menu className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push("/")}>
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/aboutUs")}>
                  About Us
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/contact")}>
                  Contact Us
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/bookLabTest")}>
                  Book Lab Test
                </DropdownMenuItem>
                {!user && (
                  <>
                    <DropdownMenuItem
                      onClick={() => router.push("/signin/patient")}
                    >
                      Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/signup/patient")}
                    >
                      Sign Up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {user ? (
            <>
              <DropdownMenu className="ml-4 w-50">
                <DropdownMenuTrigger>
                  <Avatar
                    className="cursor-pointer"
                    onClick={() => router.push(`/profile/${user?.role}`)}
                  >
                    <AvatarFallback>
                      {user.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-50 mt-2 mr-6">
                  <DropdownMenuItem
                    onClick={() => {
                      if (user?.role === "user") {
                        router.push("/profile");
                      } else if (user?.role === "admin") {
                        router.push("/superAdmin");
                      } else {
                        router.push("/admin/doctors");
                      }
                    }}
                  >
                    <User />
                    {user?.role === "user" ? "Profile" : "Admin"}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  {user?.role === "user" && (
                    <>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/appointments");
                        }}
                      >
                        <Calendar />
                        My appointments
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/labTestBookings");
                        }}
                      >
                        <TestTube />
                        LabTest Bookings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem
                    onClick={async () => {
                      await logout();
                      router.replace("/");
                    }}
                    className="text-red-500"
                  >
                    <LogOut />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex gap-0">
              <div
                className="hidden lg:flex w-[130px] items-center justify-center  ml-auto text-primary hover:cursor-pointer"
                onClick={() => router.push("/signin/patient")}
              >
                <span className="text-sm font-bold">Sign In</span>
              </div>
              <CustomButton
                className="hidden lg:flex w-[130px] items-center justify-center ml-auto"
                handleClick={() => router.push("/signup/patient")}
              >
                <span className="mx-[15px] text-sm font-bold">Sign Up</span>
              </CustomButton>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
