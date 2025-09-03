import type { ReactNode } from 'react';
import backgroundImage from '../../assets/img/background.webp'; 
import './AuthLayout.css';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={backgroundImage} alt="Caçador na natureza" className="background-image" />
        <div className="welcome-text">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-container">
          {children}
        </div>
      </div>
    </div>
  );
}