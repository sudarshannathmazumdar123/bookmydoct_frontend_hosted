import Link from "next/link"
export default function TermsAndConditon() {
    return (
        <section className="w-full flex justify-center items-center">
            <div className="container mx-auto p-6 sm:p-12 max-w-4xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
                <p className="text-gray-500 italic mb-4">Last updated: 13/11/2024</p>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-6">
                    By accessing and using BookMyDoct at BookMyDoct.com, you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please discontinue use of our site.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Use of Our Service</h2>
                <p className="mb-4">You agree to use our website only for lawful purposes and in a way that does not infringe the rights of or restrict or inhibit the use and enjoyment of the site by any third party.</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>You may not use the site to transmit any harmful, offensive, or illegal content.</li>
                    <li>You are responsible for ensuring that all information you provide on our site is accurate and up-to-date.</li>
                    <li>We reserve the right to restrict access to, or remove content that violates these Terms and Conditions.</li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Intellectual Property</h2>
                <p className="mb-6">
                    All content on BookMyDoct, including text, graphics, logos, and software, is the intellectual property of Indian Cyber Excellence Institute and is protected by applicable copyright, trademark, and other intellectual property laws. Unauthorized use or reproduction is prohibited without prior written consent.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">4. User Accounts</h2>
                <p className="mb-4">When creating an account, you agree to provide accurate information and to keep your account secure. You are responsible for any activity that occurs under your account.</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>You must notify us immediately of any unauthorized use of your account.</li>
                    <li>We reserve the right to suspend or terminate accounts that violate these Terms and Conditions.</li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
                <p className="mb-6">
                    BookMyDoct and its affiliates are not liable for any damages that may result from your use of the site, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Indemnification</h2>
                <p className="mb-6">
                    You agree to indemnify, defend, and hold harmless BookMyDoct, its officers, directors, employees, and affiliates, from any claims, liabilities, damages, losses, or expenses arising out of your use of our site or violation of these Terms and Conditions.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Third-Party Links</h2>
                <p className="mb-6">
                    Our website may contain links to third-party sites. These sites are not under our control, and we are not responsible for their content or practices. Accessing these links is at your own risk.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Modifications to Terms</h2>
                <p className="mb-6">
                    We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with the updated date. Continued use of our website after changes implies acceptance of the revised terms.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Governing Law</h2>
                <p className="mb-6">
                    These Terms and Conditions are governed by the laws of Assam, India. Any disputes related to these terms will be resolved in accordance with the laws of this jurisdiction.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
                <p>
                    If you have any questions or concerns regarding these Terms and Conditions, please <Link href="/contact" className="text-blue-500 hover:underline">contact us</Link>.
                </p>

            </div>
        </section>
    )
}