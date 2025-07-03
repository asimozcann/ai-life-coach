const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0e0018] text-cyan-400">
      <div className="animate-spin w-16 h-16 border-t-4 border-cyan-400 border-opacity-40 rounded-full mb-4" />
      <h2 className="text-xl font-semibold animate-pulse">Yükleniyor...</h2>
    </div>
  );
};

export default Loader;
