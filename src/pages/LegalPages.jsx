import React from 'react';
import { useAppStore } from '../stores/enhanced-appStore';

const LegalContainer = ({ title, children }) => {
  const { setPage, user } = useAppStore();
  
  const handleBack = () => {
    if (user) setPage('home');
    else setPage('welcome');
  };
  
  return (
    <div className="page">
      <div className="topbar">
        <button className="btn btn-ghost btn-sm" onClick={handleBack} style={{ padding: '8px', minWidth: 40, fontSize: 16 }}>←</button>
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: 1 }}>{title}</span>
      </div>
      <div className="page-content scroll-area" style={{ paddingBottom: 100 }}>
        <div className="card" style={{ background: 'var(--bg-soft)', lineHeight: 1.6, fontSize: 14 }}>
          {children}
        </div>
        <button className="btn btn-primary btn-full" style={{ marginTop: 24 }} onClick={handleBack}>GOT IT, THANKS! 🐰</button>
      </div>
    </div>
  );
};

export function TermsPage() {
  return (
    <LegalContainer title="TERMS & CONDITIONS">
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using ByteBunny, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the application.</p>
      
      <h2 style={{ marginTop: 20 }}>2. User Accounts</h2>
      <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</p>
      
      <h2 style={{ marginTop: 20 }}>3. Educational Purpose</h2>
      <p>ByteBunny is provided for educational and practice purposes. While we strive for accuracy, we are not responsible for errors in AI-generated content or code validation.</p>
      
      <h2 style={{ marginTop: 20 }}>4. Prohibited Conduct</h2>
      <p>Users may not attempt to reverse engineer the platform, bypass security measures, or use the service for any illegal activities.</p>
      
      <h2 style={{ marginTop: 20 }}>5. Limitation of Liability</h2>
      <p>ByteBunny is provided "as-is" without any warranties. We shall not be liable for any damages arising from your use of the service.</p>
      
      <p style={{ marginTop: 24, fontSize: 11, color: 'var(--text-low)' }}>Last Updated: April 21, 2026</p>
    </LegalContainer>
  );
}

export function PrivacyPage() {
  return (
    <LegalContainer title="PRIVACY POLICY">
      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly to us, such as your username, email address, and learning progress (XP, streaks, completed tasks).</p>
      
      <h2 style={{ marginTop: 20 }}>2. How We Use Information</h2>
      <p>We use the collected data to personalize your learning experience, track your achievements, and provide AI-driven feedback on your code.</p>
      
      <h2 style={{ marginTop: 20 }}>3. Data Storage (Firebase)</h2>
      <p>Your data is securely stored using Google Firebase. We adhere to industry standards to protect your personal information from unauthorized access.</p>
      
      <h2 style={{ marginTop: 20 }}>4. Third-Party Services</h2>
      <p>We use third-party AI providers (like OpenRouter/OpenAI) to generate course content and validate code. Your code snippets may be processed by these services but are not used for personal identification.</p>
      
      <h2 style={{ marginTop: 20 }}>5. Your Rights</h2>
      <p>You have the right to access, update, or delete your account information at any time through the profile settings or by contacting support.</p>
      
      <p style={{ marginTop: 24, fontSize: 11, color: 'var(--text-low)' }}>Last Updated: April 21, 2026</p>
    </LegalContainer>
  );
}
