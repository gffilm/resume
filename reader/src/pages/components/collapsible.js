import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export function Collapsible({ label, style, children }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={style}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleToggle}>
        <ExpandMoreIcon style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(270deg)' }} />
        <div>{label}</div>
      </div>
      {expanded && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}
