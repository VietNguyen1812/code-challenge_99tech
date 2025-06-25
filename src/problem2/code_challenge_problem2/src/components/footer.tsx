import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react";
import {
  FaDiscord,
  FaTelegram,
  FaEnvelope,
  FaMedium,
  FaReddit,
  FaTiktok,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="w-full bg-[#1e1e2e] text-white flex flex-col">
      <footer className="py-6 text-center text-gray-400 text-sm">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:text-white cursor-pointer">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <FaReddit className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <FaTelegram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <FaDiscord className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <FaEnvelope className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <FaMedium className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <FaTiktok className="w-5 h-5" />
          </a>
        </div>
        <div>
          © Copyright Rubic 2025.{" "}
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-white">
            Terms of Use
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
