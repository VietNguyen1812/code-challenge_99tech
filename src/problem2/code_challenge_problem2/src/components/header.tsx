const Header = () => {
  return (
    <div className="min-h-screen bg-[#1e1e2e] text-white flex flex-col">
      <div className="w-full h-2 bg-gradient-to-r from-purple-500 via-green-400 to-blue-500"></div>
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-400 rounded flex items-center justify-center">
            <i className="fas fa-cube text-[#1e1e2e]"></i>
          </div>
          <span className="font-bold text-xl">Rubic</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
