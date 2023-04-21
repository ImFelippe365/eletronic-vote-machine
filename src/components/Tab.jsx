
const Tab = ({ icon, title, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-6 py-3 gap-4 ${active ? 'font-semibold text-green-400 border-b-2 border-green-400' : 'white'}`}
    >
      {icon &&
        icon
      }
      <span className={`${active && 'text-green-400'}`}>{title}</span>
    </button>
  );
}

export default Tab;