import React from 'react';
interface FooterProps {
  isDarkMode: boolean;
}
const Footer = ({
  isDarkMode
}: FooterProps) => {
  return <footer className={`py-12 ${isDarkMode ? 'bg-black/50' : 'bg-gray-100/50'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-moonrock)' }}>
            Rahul Meena
          </div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Creative Video Editor & Cinematographer</p>
          <div className={`flex justify-center space-x-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <a href="https://instagram.com/its_rahul_fu" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-blue-400 transition-colors">YouTube</a>
            <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            
          </div>
          <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-white/10 text-gray-500' : 'border-gray-300 text-gray-500'}`}>
            © 2024 Rahul Meena. All rights reserved.
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;