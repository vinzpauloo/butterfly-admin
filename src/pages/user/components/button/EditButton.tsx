import React, {useState} from "react";
import {Button} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EditBtn = ({ modal: ModalComponent }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button style={{background: 'transparent', border: 'none'}} onClick={handleModalOpen}>
        <EditOutlinedIcon sx={{color: '#98A9BC', fontSize: 30}}/>
      </Button>
      <ModalComponent isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}

export default EditBtn
