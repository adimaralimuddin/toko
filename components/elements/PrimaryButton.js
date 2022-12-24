function PrimaryButton(props) {
  return (
    <button
      {...props}
      className={
        " px-3 py-2 bg-green-600d text-whited m-1 bg-primary disabled:bg-[#b6aeae] disabled:cursor-not-allowed hover:bg-[#7c64db] text-white font-semibold rounded-md hover:-translate-y-[2px]d hover:shadow-lgd  " +
        props?.className
      }
    >
      {props?.children}
    </button>
  );
}

export default PrimaryButton;
