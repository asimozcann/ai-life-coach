
const SelectBox = ({ label, options, selected, onSelect }) => {
  return (
    <div>
      <label className="block mb-1 text-sm text-cyan-300">{label}</label>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-3 rounded-lg bg-[#2f003d] text-white border border-cyan-400"
      >
        <option value="">Seçiniz</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
