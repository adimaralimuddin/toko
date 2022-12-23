function PrimaryButton(props) {
  return (
    <button
      {...props}
      className={
        " px-3 py-2 bg-green-600d text-whited m-1 bg-[#6e53d6] disabled:bg-[#b6aeae] disabled:cursor-not-allowed hover:bg-[#6e53d6] text-white text-lg " +
        props?.className
      }
    >
      {props?.children}
    </button>
  );
}

export default PrimaryButton;
