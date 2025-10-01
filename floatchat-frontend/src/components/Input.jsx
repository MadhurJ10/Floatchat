export default function Input({ value, onChange, placeholder, onKeyPress }) {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )
  }
  