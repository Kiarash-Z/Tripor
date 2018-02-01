import React from 'react';
import Modal from 'react-modal';

import { Button } from '../common';

const SavedListModal = ({ isOpen, list, handleItemClick, handleNewFrame }) => {
  const renderList = () => list.map(item => (
    <li key={item.id} style={{ width: '100%' }}>
      <Button
        className="list-item mb-2"
        onClick={() => handleItemClick(item)}
        bordered={false}
        style={{ display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', borderBottom: '0.5px solid #979797' }}
      >
        <i className="tripor-canvas mr-2" style={{ fontSize: '1.9em' }} />
        <span>{item.name}</span>
      </Button>
    </li>
  ));
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="New frame Modal"
    >
      <h4 style={{ fontWeight: '100', textAlign: 'center' }}>Saved UI's</h4>
      <div className="mt-6 mb-3">
        <div className="mr-7" style={{ width: '100%' }}>
          <ul style={{ width: '100%' }}>
            {renderList()}
          </ul>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="mt-5">
        <Button color="blue" onClick={handleNewFrame}>New Frame</Button>
      </div>
    </Modal>
  );
};

export default SavedListModal;