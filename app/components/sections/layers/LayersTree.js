import React from 'react';

const LayersTree = ({ treeData, toggleExpand, onMouseEnter, onMouseLeave, onClick }) => {
    const renderItemChildren = children => children.map(child => {
      return (
        <div
          key={child.id}
          style={{ display: 'flex', alignItems: 'center' }}
          className="bordered"
          onMouseEnter={() => onMouseEnter(child.id)}
          onClick={() => onClick(child.id)}
          onMouseLeave={onMouseLeave}
        >
          <i className={`${child.iconType} p-1`} />
          <span className="font-tiny">{child.name}</span>
        </div>
      )
    })
    const renderItems = () => treeData.map(item => {
      const icon = item.isExpanded ? 'tripor-down' : 'tripor-right';
      return (
        <div className="tree__item" key={item.id}>
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            className="bordered"
            onMouseEnter={() => onMouseEnter(item.id)}
            onClick={() => onClick(item.id)}
            onMouseLeave={onMouseLeave}
          >
            {item.children.length > 0 ?
              <i
                className={`${icon} font-tiny p-1`}
                style={{ color: '#797979'}}
                onClick={() => toggleExpand(item.id)}
              /> : null
            }
            <i className={`${item.iconType} p-1`} />
            <span className="font-tiny">{item.name}</span>
          </div>
          {item.isExpanded > 0 ?
          <div className="pl-5">
            {renderItemChildren(item.children)}
          </div> : null
          }
        </div>
      )
    })
    return (
      <div>
        {renderItems()}
      </div>
    )
  }

export default LayersTree;
