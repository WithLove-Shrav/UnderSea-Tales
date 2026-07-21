export default function Glossary() {
  return (
    <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5 border-2 border-slate-200 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2" style={{ fontFamily: 'Fredoka One, cursive' }}>
        <span>📖</span> Glossary
      </h3>
      <p className="text-sm md:text-base text-slate-700 font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <span className="font-bold text-sky-700">* Putter:</span> A piece of sports equipment used to play golf.
      </p>
    </div>
  );
}
