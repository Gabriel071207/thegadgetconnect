import iphoneImg from "@/assets/products/iphone-15-pro-max.png";
import iphoneDualImg from "@/assets/products/iphone-dual-cam.png";
import iphoneSingleImg from "@/assets/products/iphone-single-cam.png";
import samsungImg from "@/assets/products/samsung-s24-ultra.png";
import macbookImg from "@/assets/products/macbook-pro-m3.png";
import macbookAirImg from "@/assets/products/macbook-air.png";
import airpodsImg from "@/assets/products/airpods-pro-2.png";
import ps5Img from "@/assets/products/ps5-slim.png";
import watchImg from "@/assets/products/apple-watch-ultra-2.png";
import sonyImg from "@/assets/products/sony-wh1000xm5.png";
import ipadImg from "@/assets/products/ipad-pro-m4.png";
import ipadStdImg from "@/assets/products/ipad-standard.png";
import ipadMiniImg from "@/assets/products/ipad-mini.png";

// New model-specific images
import iphone11ProMaxImg from "@/assets/products/iphone-11-pro-max.jpeg";
import iphone11ProImg from "@/assets/products/iphone-11-pro.jpeg";
import iphone12ProImg from "@/assets/products/iphone-12-pro.webp";
import iphone12ProMaxImg from "@/assets/products/iphone-12-pro-max.webp";
import iphone12Img from "@/assets/products/iphone-12.webp";
import iphone13ProImg from "@/assets/products/iphone-13-pro.webp";
import iphone13ProMaxImg from "@/assets/products/iphone-13-pro-max.webp";
import iphone13Img from "@/assets/products/iphone-13.webp";
import iphone14ProMaxImg from "@/assets/products/iphone-14-pro-max.webp";
import iphone14ProImg from "@/assets/products/iphone-14-pro.webp";

// Exact product ID → image mapping
const exactMap: Record<string, string> = {
  // iPhone 11 Pro / Pro Max
  "iphone-11-pro-64": iphone11ProImg,
  "iphone-11-pro-256": iphone11ProImg,
  "iphone-11-pro-max-64": iphone11ProMaxImg,
  "iphone-11-pro-max-256": iphone11ProMaxImg,

  // iPhone 12 series
  "iphone-12-64": iphone12Img,
  "iphone-12-128": iphone12Img,
  "iphone-12-pro-128": iphone12ProImg,
  "iphone-12-pro-256": iphone12ProImg,
  "iphone-12-pro-max-128": iphone12ProMaxImg,
  "iphone-12-pro-max-256": iphone12ProMaxImg,

  // iPhone 13 series
  "iphone-13-128": iphone13Img,
  "iphone-13-256": iphone13Img,
  "iphone-13-pro-128": iphone13ProImg,
  "iphone-13-pro-max-128": iphone13ProMaxImg,
  "iphone-13-pro-max-256": iphone13ProMaxImg,

  // iPhone 14 series
  "iphone-14-pro-128": iphone14ProImg,
  "iphone-14-pro-256": iphone14ProImg,
  "iphone-14-pro-max-128": iphone14ProMaxImg,
  "iphone-14-pro-max-256": iphone14ProMaxImg,

  // Non-iPhone exact matches
  "samsung-s24-ultra": samsungImg,
  "airpods-pro-2": airpodsImg,
  "ps5-slim": ps5Img,
  "apple-watch-ultra-2": watchImg,
  "sony-wh1000xm5": sonyImg,
};

function getImageForId(id: string): string {
  if (exactMap[id]) return exactMap[id];

  // iPhone fallbacks by camera count
  if (id.startsWith("iphone-xr")) return iphoneSingleImg;
  if (id.startsWith("iphone-15-pro")) return iphoneImg;
  if (id.startsWith("iphone-16")) return iphoneDualImg;
  if (id.startsWith("iphone-15")) return iphoneDualImg;
  if (id.startsWith("iphone-14-plus")) return iphoneDualImg;
  if (id.startsWith("iphone-14-")) return iphoneDualImg;
  if (id.startsWith("iphone-11-")) return iphoneDualImg;
  if (id.startsWith("iphone-xs")) return iphoneDualImg;
  if (id.startsWith("iphone")) return iphoneDualImg;

  // Macs
  if (id.startsWith("mba")) return macbookAirImg;
  if (id.startsWith("mbp") || id.startsWith("macbook")) return macbookImg;

  // iPads
  if (id.includes("mini")) return ipadMiniImg;
  if (id.startsWith("ipad-air") || id.startsWith("ipad-10") || id.startsWith("ipad-11")) return ipadImg;
  if (id.startsWith("ipad")) return ipadStdImg;

  return "/placeholder.svg";
}

import { products } from "./products";
export const productImages: Record<string, string> = Object.fromEntries(
  products.map(p => [p.id, getImageForId(p.id)])
);
