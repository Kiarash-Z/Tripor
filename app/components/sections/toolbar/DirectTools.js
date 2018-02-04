import React from 'react';

const DirectTools = ({ tools, onClick, onModalToolClick }) => {
  const renderTools = () => tools.map(tool => (
    <a
      data-balloon={`${tool.name} Tool`}
      data-balloon-pos="down"
      className={`${tool.isSelected ? 'active' : ' '} toolbar__tool pointer`}
      key={tool.id}
      onClick={() => onClick(tool.id)}
      style={tool.size ? { fontSize: tool.size } : { }}
    >
      <i className={tool.icon} style={{ color: 'white' }} />
    </a>
  ));
  return (
    <div style={{ display: 'flex', gridColumn: 1 }}>
      <a
        data-balloon="Help"
        data-balloon-pos="down"
        className="p-3 pointer toolbar__tool"
        onClick={onModalToolClick}
      >
        <i className="tripor-information" style={{ color: 'white' }} />
      </a>
      {renderTools()}
    </div>
  );
}

export default DirectTools;