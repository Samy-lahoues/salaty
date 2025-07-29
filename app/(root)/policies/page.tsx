// app/privacy-policy/page.tsx

const Page = () => {
    return (
        <main
            dir="ltr"
            className="max-w-3xl mx-auto px-4 py-16 text-base leading-relaxed font-sans"
        >
            <h1 className="text-3xl font-bold mb-6 text-balance">
                Privacy Policy
            </h1>

            <p className="mb-4 text-muted-foreground">
                Last updated: July 29, 2025
            </p>

            <section className="space-y-6">
                <p>
                    Salaty (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                    respects your privacy and is committed to protecting your
                    personal information. This Privacy Policy explains how we
                    collect, use, and safeguard your data when you use the
                    Salaty app.
                </p>

                <h2 className="text-xl font-semibold">
                    1. Information We Collect
                </h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        <strong>Location Data:</strong> Used to calculate
                        accurate prayer times and Qibla direction. This data is
                        processed locally on your device and never stored or
                        transmitted to our servers.
                    </li>
                    <li>
                        <strong>Device Info:</strong> Basic technical details
                        (e.g., screen size, theme preference) are used to
                        enhance the user experience.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold">
                    2. How We Use Your Data
                </h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        To calculate accurate prayer times based on your
                        location.
                    </li>
                    <li>
                        To display Qibla direction using your device
                        compass/GPS.
                    </li>
                    <li>
                        To enhance usability across devices and screen sizes.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold">
                    3. Third-Party Services
                </h2>
                <p>We integrate the following APIs to provide core features:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        <strong>Aladhan API:</strong> Provides prayer time and
                        Qibla data. No personal data is shared.
                    </li>
                    <li>
                        <strong>YouTube Embed API:</strong> Streams the live
                        Makkah feed (optional). YouTube may collect viewing data
                        as per their terms.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold">4. Data Storage</h2>
                <p>
                    We store user preferences such as the selected calculation
                    method using your browser’s localStorage. This data is
                    stored only on your device and is never transmitted or
                    shared externally. Other sensitive information, such as your
                    location or Tasbih count, is also processed and kept
                    locally.
                </p>

                <h2 className="text-xl font-semibold">5. Cookies & Tracking</h2>
                <p>
                    Salaty does not use cookies or third-party trackers. No
                    analytics or behavioral tracking is implemented.
                </p>

                <h2 className="text-xl font-semibold">6. Children’s Privacy</h2>
                <p>
                    Salaty is safe for users of all ages. We do not knowingly
                    collect personal information from children under 13.
                </p>

                <h2 className="text-xl font-semibold">7. Your Consent</h2>
                <p>
                    By using Salaty, you agree to this Privacy Policy. You may
                    withdraw consent by deleting the app from your device.
                </p>

                <h2 className="text-xl font-semibold">
                    8. Changes to This Policy
                </h2>
                <p>
                    We may update this Privacy Policy occasionally. Changes will
                    be reflected on this page with the updated date.
                </p>

                <h2 className="text-xl font-semibold">9. Contact Us</h2>
                <p>
                    If you have any questions or concerns, please contact us via
                    GitHub Issues or our support channel listed in the README.
                </p>
            </section>
        </main>
    );
};
export default Page;
