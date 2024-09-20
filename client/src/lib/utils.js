import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import animationData from "@/assets/lottie-json.json"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const colors = [
  "bg-orange-600/20 text-orange-500 border-[1px] border-orange-500",//orange
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",//pink
  "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",//yellow
  "bg-[#60d6a02a] text-[#60d6a0] border-[1px] border-[#60d6a0bb]",//green
  "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",//blue
]
// export const colors = [
//   "bg-orange-600/20 text-orange-500 border-[1px] border-orange-500" ,//orange
//   "bg-white/20 text-white border-[1px] border-white",//white
//   "bg-[#60d6a02a] text-[#60d6a0] border-[1px] border-[#60d6a0bb]",//green
//   "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
//   "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]"//pink
// ]

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
}


export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
}