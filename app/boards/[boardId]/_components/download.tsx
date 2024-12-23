"use client";
 
import { useRouter } from 'next/navigation'
import { ToolButton } from './toolButton';
import { CANVAS_SIZE } from '@/lib/utils';
 
const canvas = document.createElement('canvas');
canvas.width = CANVAS_SIZE.width;
canvas.height = CANVAS_SIZE.height;

const tempCtx = canvas.getContext('2d');

if (tempCtx && canvasRef.current && bgRef.current) {
  tempCtx.drawImage(bgRef.current, 0, 0);
  tempCtx.drawImage(canvasRef.current, 0, 0);
}

const link = document.createElement('a');
link.href = canvas.toDataURL('image/png');
link.download = 'canvas.png';
link.click();


export default function Download() {
  return (
    <ToolButton 
    label = "Download"
    icon={ Download }               
        onClick = {() => {}}
        isActive = {false}
    />
  )
}