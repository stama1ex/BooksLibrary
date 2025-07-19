const Header: React.FC = () => {
  return (
    <div className="flex justify-center p-4 bg-gray-200 dark:bg-gray-700 transition-colors duration-100 min-w-full mb-4 shadow-2xl">
      <h1
        style={{
          backgroundColor: '#b9b9b9',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '2px 2px 2px rgba(255,255,255,0.3)',
        }}
        className="text-2xl md:text-4xl font-black text-slate-700 dark:text-white"
      >
        Books Library App
      </h1>
    </div>
  );
};

export default Header;
