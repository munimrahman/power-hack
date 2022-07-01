import React from 'react';
import { RiLinkedinLine } from 'react-icons/ri';
import { VscGithubAlt } from 'react-icons/vsc';
import { MdOutlineAlternateEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="2xl:container mx-auto">
        <div className="flex w-full justify-between items-center h-16 px-4 sm:px-6">
          <div className="">
            <div className="text-center text-sm sm:text-base">
              Website by{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://munimrahman.netlify.app/"
                className="font-semibold relative group"
              >
                <span className="absolute bottom-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-indigo-500"></span>
                Munim Rahman
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-5">
            <a
              href="https://github.com/munimrahman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 hover:text-indigo-500"
            >
              <VscGithubAlt className="h-5 sm:h-6 w-5 sm:w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/munimrahman/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 hover:text-indigo-500"
            >
              <RiLinkedinLine className="h-5 sm:h-6 w-5 sm:w-6" />
            </a>
            <a
              href="mailto:munimrh@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 hover:text-indigo-500"
            >
              <MdOutlineAlternateEmail className="h-5 sm:h-6 w-5 sm:w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
