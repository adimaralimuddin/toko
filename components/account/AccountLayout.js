import AccountSideBar from "./AccountSideBar";


function AccountLayout({ children }) {

  return (
    <div className="flex flex-1 min-h-[80vh] max-w-4xl mx-auto">
      <AccountSideBar />
      {children}
    </div>
  );
}

export default AccountLayout;
