import React from 'react';
import Modal from 'react-modal';

const InfoModal = ({ isOpen, close }) => (
  <Modal
    isOpen={isOpen}
    contentLabel="Info Modal"
  >
  <div className="info-modal">
    <div className="modal-title__container">
      <h4 style={{ fontWeight: '100' }}>Help</h4>
      <i className="tripor-close pr-2 pl-2 pointer" onClick={close} />
    </div>
    <div className="mt-6 mb-3">
      <div className="mr-7" style={{ width: '100%' }}>
        <h5 className="mb-4">Keyboard shortcuts</h5>
        <ul className="list-container">
          <li className="list-item mb-2 font-small" style={{ paddingLeft: 0 }}>
            <div>
              <i className="tripor-cursor font-medium modal__icon" />
              <span className="mr-5 ml-1">Move Tool</span>
            </div>
            <code className="key-highlight">V</code>
          </li>
          <li className="list-item mb-2 font-small" style={{ paddingLeft: 0 }}>
            <div>
              <i className="tripor-frame font-medium modal__icon" />
              <span className="mr-5 ml-1">Frame Tool</span>
            </div>
            <code className="key-highlight">F</code>
          </li>
          <li className="list-item mb-2 font-small" style={{ paddingLeft: 0 }}>
            <div>
              <i className="tripor-square font-medium modal__icon" />
              <span className="mr-5 ml-1">Rectangle Tool</span>
            </div>
            <code className="key-highlight">R</code>
          </li>
          <li className="list-item mb-2 font-small" style={{ paddingLeft: 0 }}>
            <div>
              <i className="tripor-circle font-medium modal__icon" />
              <span className="mr-5 ml-1">Circle Tool</span>
            </div>
            <code className="key-highlight">C</code>
          </li>
          <li className="list-item mb-2 font-small" style={{ paddingLeft: 0 }}>
            <div>
              <i className="tripor-text font-medium modal__icon" />
              <span className="mr-5 ml-1">Text Tool</span>
            </div>
            <code className="key-highlight">T</code>
          </li>
          <li className="list-item mb-2 font-small" style={{ paddingLeft: 0 }}>
            <div>
              <i className="tripor-hand font-medium modal__icon" />
              <span className="mr-5 ml-1">Hand Tool</span>
            </div>
            <div>
              <code className="key-highlight mr-1">Space</code>
              <code className="key-highlight">H</code>
            </div>
          </li>
          <li className="list-item mb-2 font-small" style={{ paddingLeft: 0 }}>
            <div>
              <i className="tripor-eraser font-medium modal__icon" />
              <span className="mr-5 ml-1">Delete an object</span>
            </div>
            <code className="key-highlight">Backspace</code>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </Modal>
);


export default InfoModal;
