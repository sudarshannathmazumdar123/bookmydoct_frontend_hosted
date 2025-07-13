"use client";
import {
  Settings,
  LogOut,
  Calendar,
  Stethoscope,
  ChevronDown,
  TestTube,
  ChevronDownIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import useClinicAdminPanelStore from "@/store/clinicAdminPanelStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Navbar({ children }) {
  const { ActiveTab, setActiveTab } = useClinicAdminPanelStore();
  const [isTestsOpen, setIsTestsOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();

  const validateTokens = useAuthStore((state) => state.validateTokens);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (ActiveTab === "manageTests" || ActiveTab === "ViewRequests") {
      setIsTestsOpen(true);
    }
  }, [ActiveTab]);

  const ActiveTabStyle =
    "text-primary font-bold rounded-lg bg-[#B9BFFFFF] hover:bg-[#B9BFFFFF]";
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <header className="px-4 lg:px-6 h-14 flex w-full items-center justify-between relative">
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
        <div>
          <DropdownMenu className="ml-4 w-50 border-0">
            <DropdownMenuTrigger>
              <div className="flex gap-2 pl-2">
                <Avatar className="cursor-pointer">
                  <AvatarFallback>
                    {user?.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:flex justify-center items-center">
                  {user?.fullName}
                </span>
                <span className="flex items-center gap-2">
                  <ChevronDown className=" opacity-50" />
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 mt-2 mr-6">
              <DropdownMenuItem
                onClick={() => {
                  router.push("/admin/settings");
                }}
              >
                <Settings />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
        </div>
      </header>
      <div className="flex min-h-[100vh] flex-row w-full">
        <div className="py-6 border-r bg-muted flex flex-col items-center w-[18%]">
          <nav className="space-y-4 p-2">
            <Button
              variant={`${ActiveTab === "appointments" ? "" : "ghost"}`}
              className={` w-full justify-start ${
                ActiveTab === "appointments" && ActiveTabStyle
              }`}
              onClick={() => {
                router.push("/admin/appointments");
                setActiveTab("appointments");
              }}
            >
              <div className="flex items-center gap-4">
                <Calendar className="" size={20} />
                <span className="hidden md:flex">Appointments</span>
              </div>
            </Button>
            <Button
              variant={`${ActiveTab === "doctors" ? "" : "ghost"}`}
              className={` w-full justify-start ${
                ActiveTab === "doctors" && ActiveTabStyle
              }`}
              onClick={() => {
                router.push("/admin/doctors");
                setActiveTab("doctors");
              }}
            >
              <Stethoscope className="mr-2" size={20} />
              <span className="hidden md:flex">Doctors</span>
            </Button>
            <Button
              variant={`${ActiveTab === "settings" ? "" : "ghost"}`}
              className={` w-full justify-start ${
                ActiveTab === "settings" && ActiveTabStyle
              }`}
              onClick={() => {
                router.push("/admin/settings");
                setActiveTab("settings");
              }}
            >
              <Settings className="mr-2" size={20} />
              <span className="hidden md:flex">Settings</span>
            </Button>
            <Collapsible open={isTestsOpen} onOpenChange={setIsTestsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start mb-2">
                  <div className="flex items-center gap-4">
                    <TestTube className="" size={20} />
                    <span className="hidden md:flex">Tests</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isTestsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                <Button
                  variant={`${ActiveTab === "manageTests" ? "" : "ghost"}`}
                  className={` w-full justify-start pl-9 ${
                    ActiveTab === "manageTests" && ActiveTabStyle
                  }`}
                  onClick={() => {
                    router.push("/admin/tests/manage");
                    setActiveTab("manageTests");
                  }}
                >
                  <span className="hidden md:flex">Manage Tests</span>
                </Button>
                <Button
                  variant={`${ActiveTab === "viewRequests" ? "" : "ghost"}`}
                  className={` w-full justify-start pl-9 ${
                    ActiveTab === "viewRequests" && ActiveTabStyle
                  }`}
                  onClick={() => {
                    router.push("/admin/tests/viewRequests");
                    setActiveTab("viewRequests");
                  }}
                >
                  <span className="hidden md:flex">View Requests</span>
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </div>
        <div className="w-[82%] p-4">{children}</div>
      </div>
    </>
  );
}
