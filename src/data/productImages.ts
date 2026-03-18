import iphoneImg from "@/assets/products/iphone-15-pro-max.png";
import samsungImg from "@/assets/products/samsung-s24-ultra.png";
import macbookImg from "@/assets/products/macbook-pro-m3.png";
import airpodsImg from "@/assets/products/airpods-pro-2.png";
import ps5Img from "@/assets/products/ps5-slim.png";
import watchImg from "@/assets/products/apple-watch-ultra-2.png";
import sonyImg from "@/assets/products/sony-wh1000xm5.png";
import ipadImg from "@/assets/products/ipad-pro-m4.png";

// Map specific flagship IDs
const exactMap: Record<string, string> = {
  "iphone-15-pro-max": iphoneImg,
  "samsung-s24-ultra": samsungImg,
  "macbook-pro-m3-max": macbookImg,
  "airpods-pro-2": airpodsImg,
  "ps5-slim": ps5Img,
  "apple-watch-ultra-2": watchImg,
  "sony-wh1000xm5": sonyImg,
};

// Prefix-based mapping for all variants
function getImageForId(id: string): string {
  if (exactMap[id]) return exactMap[id];
  if (id.startsWith("iphone")) return iphoneImg;
  if (id.startsWith("mbp") || id.startsWith("mba") || id.startsWith("macbook")) return macbookImg;
  if (id.startsWith("ipad")) return ipadImg;
  return "/placeholder.svg";
}

// Build full map from products
import { products } from "./products";
export const productImages: Record<string, string> = Object.fromEntries(
  products.map(p => [p.id, getImageForId(p.id)])
);
