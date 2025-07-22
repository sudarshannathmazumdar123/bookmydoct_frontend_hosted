"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, User } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import useClinicAdminPanelStore from "@/store/clinicAdminPanelStore";
import toast from "react-hot-toast";

export default function Settings() {
  const { user, changePassword, isLoading, updateUser } = useAuthStore();
  const { setActiveTab } = useClinicAdminPanelStore();
  const router = useRouter();
  const [isClinicChanged, setIsClinicChanged] = useState(false);
  const [isAdminChanged, setIsAdminChanged] = useState(false);

  useLayoutEffect(() => {
    setActiveTab("settings");
  }, []);

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [updatedClinic, setUpdatedClinic] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [updatedAdmin, setUpdatedAdmin] = useState({
    fullName: "",
    email: "",
  });
  const { updateClinicDetails, getClinicDetails, clinicDetails } =
    useClinicAdminPanelStore();
  useEffect(() => {
    if (user) {
      setUpdatedAdmin({ email: user.email, fullName: user.fullName });
      getClinicDetails();
    }
  }, [user]);

  useEffect(() => {
    if (clinicDetails) {
      setUpdatedClinic({
        name: clinicDetails?.name,
        notes: clinicDetails?.notes,
        addressOne: clinicDetails?.addressOne,
        phoneNumber: clinicDetails?.phoneNumber || "",
        email: clinicDetails?.email || "",
        addressTwo: clinicDetails?.addressTwo || "",
        city: clinicDetails?.city || "",
        state: clinicDetails?.state || "",
        pincode: clinicDetails?.pincode || "",
      });
    }
  }, [clinicDetails]);

  const handleAdminInputChange = (e) => {
    setIsAdminChanged(true);
    const { name, value } = e.target;
    setUpdatedAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
  };
  const handleClinicInputChange = (e) => {
    setIsClinicChanged(true);
    const { name, value } = e.target;
    setUpdatedClinic((prevClinic) => ({ ...prevClinic, [name]: value }));
  };
  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    if (!updatedAdmin.fullName || !updatedAdmin.email) {
      toast.error("Please fill all the fields");
      return;
    }
    await updateUser(updatedAdmin, "clinic");
    setIsAdminChanged(false);
    router.push("/admin/settings");
  };
  const handleUpdateClinic = async (e) => {
    e.preventDefault();

    if (
      !updatedClinic.name ||
      !updatedClinic.phoneNumber ||
      !updatedClinic.email ||
      !updatedClinic.addressOne ||
      !updatedClinic.city ||
      !updatedClinic.state ||
      !updatedClinic.pincode
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    await updateClinicDetails(updatedClinic);
    setIsClinicChanged(false);
    router.push("/admin/settings");
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmNewPassword
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (password.newPassword !== password.confirmNewPassword) {
      toast.error("New Password and confirm New password do not match");
      return;
    }

    await changePassword(
      password.currentPassword,
      password.newPassword,
      user.role
    );
    router.push("/admin/settings");
  };
  return (
    <div className="p-6 space-y-8 max-w-5xl md:min-w-[600px]">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* Clinic Profile Section */}
      <div className="space-y-4">
        <div className="flex flex-row gap-2 text-primary">
          <User className="h-6 w-6" />
          <div className="flex flex-col">
            <h2 className="font-bold text-black">Clinic/Hospital Profile</h2>
            <p className="text-sm text-muted-foreground">
              Update Your Clinic/Hospital
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="font-bold">Name</Label>
            <Input
              name="name"
              placeholder="Name"
              className="bg-muted rounded-xl border-0"
              value={updatedClinic.name}
              onChange={handleClinicInputChange}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-bold">Notes</Label>
            <Input
              name="notes"
              placeholder="Notes"
              className="bg-muted rounded-xl border-0"
              value={updatedClinic.notes}
              onChange={handleClinicInputChange}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-bold">Email</Label>

            <Input
              placeholder="Email"
              type="email"
              className="bg-muted rounded-xl border-0"
              value={updatedClinic.email}
              onChange={handleClinicInputChange}
              name="email"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-bold">Phone</Label>

            <Input
              placeholder="Phone"
              type="tel"
              className="bg-muted rounded-xl border-0"
              value={updatedClinic.phoneNumber}
              onChange={handleClinicInputChange}
              name="phoneNumber"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-bold">Address Line 1</Label>
            <Input
              placeholder="Address Line 1"
              className="bg-muted rounded-xl border-0"
              value={updatedClinic.addressOne}
              onChange={handleClinicInputChange}
              name="addressOne"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-bold">Address Line 2</Label>
            <Input
              placeholder="Address Line 2"
              className="bg-muted rounded-xl border-0"
              value={updatedClinic.addressTwo}
              onChange={handleClinicInputChange}
              name="addressTwo"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-bold">City</Label>
            <Input
              placeholder="City"
              className="bg-muted rounded-xl border-0"
              value={updatedClinic.city}
              onChange={handleClinicInputChange}
              name="city"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-bold">State</Label>
            <Input
              placeholder="State"
              className="bg-muted rounded-xl border-0"
              value={updatedClinic.state}
              onChange={handleClinicInputChange}
              name="state"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-bold">Pincode</Label>
            <Input
              placeholder="pincode"
              className="bg-muted rounded-xl border-0"
              value={updatedClinic.pincode}
              onChange={handleClinicInputChange}
              name="pincode"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-3 md:gap-y-0 md:flex-row gap-3 justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="bg-rose-500 hover:bg-rose-600 text-white rounded-3xl"
              >
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleChangePassword}>
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="text"
                    value={password.currentPassword}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="text"
                    value={password.newPassword}
                    onChange={(e) =>
                      setPassword({ ...password, newPassword: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="text"
                    value={password.confirmNewPassword}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        confirmNewPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Update Password"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            className="rounded-3xl"
            onClick={handleUpdateClinic}
            disabled={!isClinicChanged}
          >
            <Check />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Admin Profile Section */}
      <div className="space-y-4">
        <div className="flex flex-row gap-2 text-primary">
          <User className="h-6 w-6" />
          <div className="flex flex-col">
            <h2 className="font-bold text-black">Admin Profile</h2>
            <p className="text-sm text-muted-foreground">Update Your Admin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="font-bold">Full Name</Label>
            <Input
              placeholder="Full Name"
              className="bg-muted rounded-xl border-0"
              value={updatedAdmin.fullName}
              onChange={handleAdminInputChange}
              name="fullName"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-bold">Email</Label>

            <Input
              placeholder="Email"
              type="email"
              className="bg-muted rounded-xl border-0"
              value={updatedAdmin.email}
              onChange={handleAdminInputChange}
              name="email"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            className={`rounded-3xl`}
            onClick={handleUpdateAdmin}
            disabled={!isAdminChanged}
          >
            <Check />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
