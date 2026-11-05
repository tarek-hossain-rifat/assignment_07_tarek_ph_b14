import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-row items-center fixed inset-x-0 bottom-0 z-40 h-14 border-t bg-white">
      <div className="max-w-7xl w-full mx-auto flex flex-row items-center justify-between px-4">
        <div>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</div>

        <div>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</div>
      </div>
    </footer>
  );
};

export default Footer;
