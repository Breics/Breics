import React from 'react';

function ActionMenu() {
  return (
    <div className="absolute bg-white shadow-md p-2 rounded z-10">
      <button className="block w-[150px] text-left px-2 py-2 hover:bg-gray-100">View reservation</button>
      <button className="block w-[150px] text-left px-2 py-2 hover:bg-gray-100">Accept reservation</button>
      <button className="block w-[150px] text-left px-2 py-2 hover:bg-gray-100">Reject reservation</button>
    </div>
  );
}

export default ActionMenu;
