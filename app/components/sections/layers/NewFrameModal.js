import React from 'react';
import Modal from 'react-modal';
import { Button, Input } from '../../common';

const NewFrameModal = ({
  isOpen,
  onMount,
  onClose,
  devices,
  onSelectDevice,
  activeDevice,
  changeDimensions,
  createFrame,
  projectName,
  updateProjectName,
}) => {
  const renderDevices = () => {
    return devices.map(device => (
      <li
        key={device.id}
        onClick={() => onSelectDevice(device.id)}
        className={`list-item mb-2 font-small pointer ${device.isSelected ? 'active-border' : ' '}`}
      >
        <i className={`${device.icon} font-medium mr-1`} />
        <span>{device.name}</span>
      </li>
    ));
  };
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onMount}
      onRequestClose={onClose}
      contentLabel="Example Modal"
    >
      <h4 style={{ fontWeight: '100' }}>Create a new frame</h4>
      <div className="new-frame__details mt-6">
        <div className="mr-7">
          <h5 className="mb-3">Predefined</h5>
          <ul>
            {renderDevices()}
          </ul>
        </div>
        <div>
          <h5 className="mb-1">Properties</h5>
          <div className="mb-2">
            <i className="tripor-width mr-2" />
            <Input
              type="number"
              value={activeDevice.width}
              onChange={value => changeDimensions(value, 'width')}
            />
          </div>
          <div>
            <i className="tripor-height mr-2" />
            <Input
              type="number"
              value={activeDevice.height}
              onChange={value => changeDimensions(value, 'height')}
            />
          </div>
        </div>
      </div>
      <div className="new-frame__button-container">
        <Button large color="blue" onClick={createFrame}>Create</Button>
      </div>
    </Modal>
  );
}


export default NewFrameModal;
