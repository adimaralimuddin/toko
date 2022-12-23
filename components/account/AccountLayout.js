import AccountSideBar from "./AccountSideBar";

function AccountLayout({ children }) {
  return (
    <div className="flex flex-col sm:flex-row flex-1 min-h-[80vh] max-w-5xl mx-auto p-3">
      <AccountSideBar />
      {children}
    </div>
  );
}

export default AccountLayout;
