import BreadCrumbs from "../components/breadcrumbs";
import ExploreNavBar from "../components/explore_navbar"

const Privacy = () => {
    return (
        <div>
            <ExploreNavBar />
            <BreadCrumbs />
            <div className="hero bg-white min-h-screen">
                <div className="text-center hero-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Privacy Policy</h1>
                        <p className="mb-5">
                            The YU Sync team is dedicated to transparency and user privacy. This privacy policy will highlight how and what data the YU-Sync site collects, uses, and stores, user information; in relation to you, cookies, third-party entities, and non-identifiable personal information. By using services provided by our website, you agree to the terms and conditions outlined in the Policy, should you have general questions or concerns about any information in our Privacy Policy, please reach out to  <a className="link link-error">help@yusync.com</a></p>
                        <h2 className="mb-5 text-3xl font-bold">1. Information Collection</h2>
                        <p className="mb-5">
                            When you visit the site, information may be collected to improve your experience. This information may include your IP address, browser type, and operating system. This information is collected to improve the user experience and to ensure the site is functioning correctly. This information is not shared with any third-party entities and is not used to identify you personally, but rather, the data helps us understand how users interact with the site.</p>
                        <h2 className="mb-5 text-2xl font-bold">1.1. Cookies</h2>
                        <p className="mb-5">
                            YU Sync uses cookies, these cookies allow us to simplify user experience and return data to help us improve the site. A few uses of the cookies are:
                            <ul>
                                <li>Remembering your preferences and theme choices; such as light and dark mode.</li>
                                <li>Ensure user security on all website interactions.</li>
                                <li>Track user interactions with the site to improve user experience.</li>
                                <li>View data on visitor usage of certain website services to improve performance and quality</li>
                            </ul>
                        </p>
                        <h2 className="mb-5 text-2xl font-bold">1.2. Non-Identifiable Data</h2>
                        <p className="mb-5">
                            Place holder for non-identifiable data
                        </p>
                        <h2 className="mb-5 text-2xl font-bold">1.3. Third-Party Entities</h2>
                        <p className="mb-5">
                            YU-Sync uses a variety of methods to secure user account information, such as passwords and usernames. Along this authentication process is a method called "OAuth", OAuth is the method of security that the additional sign in options (Google, Facebook, etc.) use to authenticate your account. This method is secure and does not share your password with YU-Sync. The OAuth method is used to ensure that your account is secure and that your information is not shared with any third-party entities. YU-Sync does not share your information with any third-party entities, and we do not sell your information to any third-party entities. If you have any questions or concerns about the security of your account, please reach out to <a className="link link-error">help@yusync.com</a>
                        </p>
                        <h2 className="mb-5 text-2xl font-bold">2. Information Usage</h2>
                        <p className="mb-5">
                            The information collected by YU Sync is primarily used to improve user experience and to ensure the site is functioning correctly. We may also monitor the site's performance and usage to improve the quality of the site. The information collected is not used to identify you personally, but rather, to understand how users interact with the site. The information collected is not shared with any third-party entities.
                        </p>
                        <h2 className="mb-5 text-2xl font-bold">3. Your Choices</h2>
                        <p className="mb-5">
                            The YU-Sync team recognizes your right to privacy and the collection and usage of your data:
                            <ul>
                                <li>You have the right to manage your cookie preferences through your broswer. and acknowledge some services of YU-Sync may function differently due to the change</li>
                                <li>You have the right to absolute data deletion, as the deletion of your account will remove any existing records of your data.</li>
                                <li>You have the right, if applicable, to opt out of any third party services through their instructions. A list of these third-party privacy polices can be found below</li>
                                <li>add more if needed</li>
                            </ul>
                        </p>
                        <h2 className="mb-5 text-2xl font-bold">3. User Security</h2>
                        <p className="mb-5">
                            We at YU Sync take the security of your account seriously, and measures to prevent any loss, misuse, leakage, or otherwise unauthorized access of data are implemented for protection. However, no web-based service is 100% secure, and as such, we cannot guarantee the absolute security of your information. If you have any questions or concerns about the security of your data.</p>
                        <h2 className="mb-5 text-2xl font-bold">4. Third-Party's</h2>
                        <p className="mb-5">
                            YU Sync uses a variety of third-party services to improve the quality and usage of the site, we may share non-identifiable information with third-party service providers. YU Sync's Privacy Policy does not apply to external software or services. We recommend you review the privacy policies of these third-party services to understand how they collect and use your information, and further information on opting out should you wish for it. A list of these third-party services can be found below:
                            <ul>
                                <li>Google: <a className="link link-success">https://policies.google.com/privacy</a></li>
                                <li>Facebook: <a className="link link-info">https://www.facebook.com/privacy/policy/</a></li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;