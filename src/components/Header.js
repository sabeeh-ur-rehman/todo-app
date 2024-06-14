import React from "react";
const Header = ({ handleOpen }) => {
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="flex justify-between items-center border-b p-8 max-md:m-6">
        <h1
          onClick={reloadPage}
          className="font-bold text-2xl cursor-pointer text-[#69665c]"
        >
          todo
        </h1>
        <div>
          {/* plus icon that open modal  */}

          <svg
            className="w-7 fill-[#69665c] cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={handleOpen}
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Header;
