"use client";

import CustomButton from "@/components/ui/CustomButton";
import Overlay from "@/components/ui/overlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Contact() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Message sent successfully!");
      event.target.reset();
    } else {
      toast.error("Something went wrong!");
      setResult(data.message);
    }
  };
  return (
    <div className="w-full mx-auto">
      <section className="md:pl-[132px] relative w-full py-12 md:py-24 lg:py-32 bg-[url('/contactHero.png')] bg-cover bg-center">
        <Overlay />
        <div className="container z-10 relative px-4 md:px-6 ">
          <div className="flex flex-col space-y-4  text-white">
            <h1 className="text-3xl font-bold  sm:text-4xl md:text-5xl lg:text-6xl/none ">
              Contact Us
            </h1>
            <p className=" max-w-[700px] text-gray-200 md:text-xl">
              We're here to support your health journey.
            </p>
          </div>
        </div>
      </section>
      <section className=" flex justify-center items-center">
        <div className="container px-4 py-12 md:py-16 lg:py-24">
          <h1 className="text-3xl font-bold text-center mb-12">
            Contact Information
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
            {/* Contact Information */}
            <div className="space-y-8 flex flex-col ">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Phone Numbers:</h2>
                  <div className="space-y-2">
                    <a
                      href="tel:+919957052223"
                      className="flex items-center gap-2 text-primary hover:underline p-2 rounded-lg hover:bg-gray-50"
                    >
                      <Phone className="h-5 w-5" />
                      +91 9957052223 | +91 8822452046
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Email Address:</h2>
                  <a
                    href="mailto:bookmydoct@gmail.com"
                    className="flex items-center gap-2 text-primary hover:underline p-2 rounded-lg hover:bg-gray-50"
                  >
                    <Mail className="h-5 w-5" />
                    bookmydoct@gmail.com
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Our Location
                </h2>
                <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14512.43941957939!2d92.44640519727069!3d24.585404699754207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751df43b60e0653%3A0x9c86c41afb2eb6e8!2sRamkrishna%20Nagar%2C%20Assam%20788166!5e0!3m2!1sen!2sin!4v1731062342805!5m2!1sen!2sin"
                    width={"100%"}
                    height={"100%"}
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex items-start lg:items-center">
              <form
                onSubmit={onSubmit}
                className="space-y-6 w-full max-w-[500px] mx-auto"
              >
                <div>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    required
                    name="name"
                    className="rounded-2xl p-6"
                  />
                </div>

                <div>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="rounded-2xl p-6"
                  />
                </div>

                <div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    name="phone"
                    className="rounded-2xl p-6"
                  />
                </div>

                <div>
                  <Textarea
                    id="message"
                    placeholder="Type your message here"
                    className="min-h-[150px] rounded-2xl p-6"
                    name="message"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-primary hover:opacity-80 self-end text-white font-bold py-6 px-8 rounded-3xl"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#F3F4F6FF] w-full text-primary text-center">
        <h2 className="text-3xl font-bold mb-4">Let’s Get In Touch!</h2>
        <p className="mb-8 text-black">
          We'd love to hear from you! Fill in your details and let us help you
          connect with the right health professionals.
        </p>
        <Link href={"/contact"}>
          <CustomButton className="w-[150px] mx-auto">
            Get in Touch
          </CustomButton>
        </Link>
      </section>
    </div>
  );
}
