import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const  NewModal = (props) =>  {
  
    const [modal, setModal] = useState(false);
    useEffect(() => {
      setModal(true)
    }, []);

    const toggle = () => {
      props.toggle()
      setModal(!modal);
    }
  
      return (
        <div>
          
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{props.heading}</ModalHeader>
            <ModalBody>
              {props.children}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>Ok</Button>{' '}
            </ModalFooter>
          </Modal>
        </div>
      );
  }

  export default NewModal;