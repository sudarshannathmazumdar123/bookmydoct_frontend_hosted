import { Facebook, Linkedin, Twitter, Youtube, Menu, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold">
              BookMyDoct
            </Link>
            <p className="text-gray-400 text-sm">
              Your trusted platform for booking medical appointments online.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/aboutUs" className="text-gray-400 hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/signin/clinic" className="text-gray-400 hover:text-white transition-colors">
                  Login Clinic/Hospital
                </Link>
              </li>
              <li>
                <Link href="/signup/clinic" className="text-gray-400 hover:text-white transition-colors">
                  Register Clinic/Hospital
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/termsAndConditions" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacyPolicy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refundPolicy" className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
			  <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <a href="mailto:bookmydoct@gmail.com" className="hover:text-white transition-colors">
                  bookmydoct@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <a href="tel:+919957052223" className="hover:text-white transition-colors">
                  +91 9957052223
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-5 w-5 mt-1" />
                <address className="not-italic">
                  RamKrishna Nagar,<br />
                  Karimganj (Sribhumi),<br />
                  Assam, 788166
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 BookMyDoct, All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              
              <Link href="https://www.linkedin.com/in/sudarshan-nath-mazumdar-574968225" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://www.instagram.com/bookmydoct" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
	);
}
