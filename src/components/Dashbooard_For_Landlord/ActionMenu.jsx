import React from 'react';
import '../../styles/ActionMenu.css'

function ActionMenu() {
  return (
    <div className="action-menu">
      <button>View reservation</button>
      <button>Accept reservation</button>
      <button>Reject reservation</button>
    </div>
  );
}

export default ActionMenu;
