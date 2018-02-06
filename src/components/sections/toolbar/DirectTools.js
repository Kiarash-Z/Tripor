import React from 'react';

const DirectTools = ({ tools, onClick, onChildToolClick, onModalToolClick, toggleToolSelectors }) => {
  // child tools in openend menu
  const renderChildTool = parent => parent.children.map(child => {
    return (
      <li
        className="toolbar__tool pointer font-tiny"
        key={child.id}
        onClick={e => {
          e.stopPropagation();
          onClick(parent.id)
          onChildToolClick(parent.id, child.id);
          toggleToolSelectors(parent.id);
        }}
        style={{ background: child.isSelected ? '#60C1F9' : '#2c2c2c' }}
      >
        <i className={child.icon} style={{ color: 'white' }} />
        <span style={{ color: 'white' }} className="ml-3">{child.name} Tool ({child.shortcutKey})</span>
      </li>
    )
  });

  // main tools
  const renderTools = () => tools.map(tool => {
    if (tool.children) {
      const selectedChild = tool.children.find(child => child.isSelected)
      const firstChild = tool.children[0];
      const viewChild = selectedChild || firstChild;
      return (
        <a
          className={`${tool.isSelected ? 'active' : ' '} toolbar__tool pointer`}
          key={tool.id}
          onClick={() => {
            onClick(tool.id)
            onChildToolClick(tool.id, viewChild.id);
          }}
          style={{ position: 'relative' }}
        >
          <i
            onClick={() => toggleToolSelectors(tool.id)}
            className="tripor-down p-1"
            style={{ position: 'absolute', right: '0', bottom: '0.2rem', color: 'white', fontSize: '7px' }}
          />
          <i className={viewChild.icon} style={{ color: 'white' }} />
          {tool.isOpen ? <div style={{ position: 'absolute', top: 'calc(100% + 3px)', width: '300%' ,zIndex: 1, left: 0 }}>
              <ul>
                {renderChildTool(tool)}
              </ul>
            </div>: null}
        </a>
      )
    }
    return (
      <a
        data-balloon={`${tool.name} Tool (${tool.shortcutKey})`}
        data-balloon-pos="down"
        className={`${tool.isSelected ? 'active' : ' '} toolbar__tool pointer`}
        key={tool.id}
        onClick={() => onClick(tool.id)}
        style={tool.size ? { fontSize: tool.size } : { }}
      >
        <i className={tool.icon} style={{ color: 'white' }} />
      </a>
    )
  })
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