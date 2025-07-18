
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Privacy Policy</h1>
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <p>Welcome to AI Read-to-Earn ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-slate-800 dark:text-slate-200">1. Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect via the App includes:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li><strong>Personal Data:</strong> We do not directly collect personally identifiable information such as your name, shipping address, email address, or telephone number unless you provide it to us for specific purposes like payout requests (e.g., UPI ID).</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the App, such as your user progress, points balance, transaction history, stories generated, and login dates. This data is stored locally on your device and is not transmitted to our servers.</li>
          <li><strong>Device Data:</strong> We do not collect information about your mobile device, such as your device ID, model, and manufacturer.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-slate-800 dark:text-slate-200">2. Use of Your Information</h2>
        <p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the App to:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Create and manage your in-app account (stored locally).</li>
          <li>Generate AI-based stories tailored to your prompts.</li>
          <li>Manage your points and transaction history.</li>
          <li>Enable user-to-user communications (if such features are added).</li>
          <li>Process payments and refunds for point redemptions.</li>
          <li>Deliver targeted advertising to you through services like Google AdMob.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-slate-800 dark:text-slate-200">3. Third-Party Services</h2>
        <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Google Gemini API:</strong> We use Google's Gemini API to generate story content. Your prompts are sent to Google to process this request. We recommend reviewing Google's Privacy Policy.</li>
            <li><strong>Advertising:</strong> We may use third-party advertising companies to serve ads when you use the App. These companies may use information about your visits to our App and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-slate-800 dark:text-slate-200">4. Data Security</h2>
        <p>We use administrative, technical, and physical security measures to help protect your information. Your primary application data (points, stories, progress) is stored locally on your device via your browser's localStorage. While we have taken reasonable steps to secure the data, please be aware that no security measures are perfect or impenetrable.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-slate-800 dark:text-slate-200">5. Policy for Children</h2>
        <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-slate-800 dark:text-slate-200">6. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
        
        <p className="mt-6 italic"><strong>Disclaimer:</strong> This is a template Privacy Policy and is not a substitute for legal advice. You should consult with a legal professional to ensure compliance with all applicable laws and regulations.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
