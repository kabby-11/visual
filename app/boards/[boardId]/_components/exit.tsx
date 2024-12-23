"use client";
 
import { useRouter } from 'next/navigation'
import { ToolButton } from './toolButton';
import { Grid3X3, LogOut } from 'lucide-react';
 
export default function Exit() {
  const router = useRouter()
 
  return (
    <ToolButton 
    label = "Exit"
    icon={ LogOut }              
    onClick = {() => router.push('/')}
    isActive = {false}
    />
  )
}