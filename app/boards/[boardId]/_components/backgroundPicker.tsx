"use client";
import { CgScreen } from 'react-icons/cg';

import { useModal } from '../modal';

import BackgroundModal from './backgroundModal';
import { ToolButton } from './toolButton';
import { Grid3X3 } from 'lucide-react';

const BackgroundPicker = () => {
  const { openModal } = useModal();

  return (
    <div>
        <ToolButton 
     label = "Grid"
     icon={ Grid3X3 }               
      onClick = {() => openModal(<BackgroundModal />)}
      isActive = {false}
     />
    </div>
     
  );
};

export default BackgroundPicker;
