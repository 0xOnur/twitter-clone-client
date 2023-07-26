const NextButton = () => {
  return (
    <div className="leading-4">
      <button
        type="button"
        disabled={true}
        className="disabled:opacity-50 bg-black text-white py-2 px-4 rounded-full font-bold"
      >
        Next
      </button>
    </div>
  );
};

export default NextButton;
