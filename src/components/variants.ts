import { ref } from 'vue'

export const badgeVariantsRef = ref({
  badge:
    'rounded-full flex justify-center items-center font-medium px-[9px] py-[1px] text-12',
  blue: 'bg-jetBlue/10 text-jetBlue',
  green: 'bg-jetGreen/10 text-jetGreen',
  orange: 'bg-jetOrange/10 text-jetOrange',
  gray: 'bg-gray-200 text-grey-500',
  red: 'bg-jetRed/10 text-jetRed'
})

export const buttonVariantsRef = ref({
  button:
    'flex justify-center items-center w-full h-[38px] min-w-[97px] px-[10px] font-[600] cursor-pointer',
  outline_success:
    'border rounded border-jetGreen text-jetGreen hover:bg-jetGreen/10',
  outline_danger:
    'border rounded !border-jetRed !text-jetRed hover:bg-jetRed/10',
  outline_default:
    'border rounded !border-jetGray !text-jetGray hover:bg-jetGray/10',
  normal_success: ' rounded !bg-jetGreen !text-white hover:bg-green-500',
  normal_danger: ' rounded !bg-jetRed !text-white hover:bg-red-500',
  normal_default: ' rounded !bg-jetGray !text-white hover:bg-gray-500'
})
