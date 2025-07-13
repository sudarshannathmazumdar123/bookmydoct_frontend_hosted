import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <section className="w-full flex justify-center items-center">
      <div className="container mx-auto p-6 sm:p-12 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold  text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-500 italic mb-4">Last updated: 13/11/2024</p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Introduction
        </h2>
        <p className="mb-4">
          Welcome to BookMyDoct, a DBA of SudamaSolutions Technologies & Health
          Care Pvt Ltd, your privacy is important to us. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website, www.bookmydoct.com, including any other
          media form, media channel, mobile website, or mobile application
          related or connected thereto.
        </p>
        <p className="mb-6">
          By accessing or using our website, you consent to the terms of this
          Privacy Policy. If you do not agree, please do not use our site.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We may collect and process the following types of information:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>Personal Information</strong>: Includes information like
            your name, email address, phone number, and any other details you
            provide when you register, make a purchase, or contact us.
          </li>
          <li>
            <strong>Payment Information</strong>: When you make a purchase, we
            may collect payment information, such as your credit card details
            and billing address. Payment details are processed by our secure
            payment provider and not stored on our servers.
          </li>
          <li>
            <strong>Usage Data</strong>: Information about your interaction with
            the website, including IP address, browser type, operating system,
            referring URLs, pages visited, and date/time stamps.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies</strong>: We may use
            cookies and similar tracking technologies to collect information
            about your interaction with our site, which helps us improve your
            experience.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>To operate and maintain our website</li>
          <li>To process transactions and manage your orders</li>
          <li>
            To communicate with you about updates, promotions, and customer
            support
          </li>
          <li>To personalize your experience and optimize site performance</li>
          <li>
            To conduct analytics and understand how users interact with our site
          </li>
          <li>To ensure security and prevent fraudulent activities</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          3. Disclosure of Your Information
        </h2>
        <p className="mb-4">
          We may share your information in the following situations:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>With Service Providers</strong>: We may share your
            information with third-party service providers to perform services
            on our behalf, such as payment processing, data analysis, and email
            marketing.
          </li>
          <li>
            <strong>For Legal Purposes</strong>: We may disclose your
            information if required by law, in response to valid requests by
            public authorities, or to protect our rights.
          </li>
          <li>
            <strong>In Business Transfers</strong>: If we undergo a merger,
            acquisition, or asset sale, your information may be transferred as
            part of that transaction.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          4. Security of Your Information
        </h2>
        <p className="mb-6">
          We implement appropriate security measures to protect your information
          from unauthorized access, alteration, or disclosure. However, no
          method of transmission over the Internet or electronic storage is 100%
          secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          5. Your Data Protection Rights
        </h2>
        <p className="mb-4">
          Depending on your location, you may have rights under data protection
          laws, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>Access</strong>: The right to request copies of your
            personal data.
          </li>
          <li>
            <strong>Rectification</strong>: The right to request correction of
            any inaccurate data.
          </li>
          <li>
            <strong>Erasure</strong>: The right to request that we delete your
            data, under certain conditions.
          </li>
          <li>
            <strong>Restriction of Processing</strong>: The right to request
            that we limit the processing of your data.
          </li>
          <li>
            <strong>Object to Processing</strong>: The right to object to our
            processing of your personal data, under certain conditions.
          </li>
        </ul>
        <p className="mb-6">
          To exercise any of these rights, please{" "}
          <Link href="/contact" className="text-blue-500 hover:underline">
            Contact us
          </Link>
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          6. Third-Party Websites
        </h2>
        <p className="mb-6">
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these external
          sites.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          7. Children's Privacy
        </h2>
        <p className="mb-6">
          Our website is not intended for children under the age of 13, and we
          do not knowingly collect personal data from children under 13. If we
          learn that we have collected such data, we will take steps to delete
          it.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          8. Changes to This Privacy Policy
        </h2>
        <p className="mb-6">
          We may update our Privacy Policy from time to time. Changes will be
          posted on this page, and the updated date will reflect at the top of
          this document.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          9. Contact Us
        </h2>
        <p>
          If you have any questions or concerns about our Privacy Policy, please{" "}
          <Link href="/contact" className="text-blue-500 hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
