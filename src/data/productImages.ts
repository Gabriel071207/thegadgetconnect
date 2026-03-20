import samsungImg from "@/assets/products/samsung-s24-ultra.webp";
import macbookImg from "@/assets/products/macbook-pro-m3.jpeg";
import macbookAirImg from "@/assets/products/macbook-air.webp";
import airpodsImg from "@/assets/products/airpods-pro-2.webp";
import ps5Img from "@/assets/products/ps5-slim.png";
import watchImg from "@/assets/products/apple-watch-ultra-2.webp";
import sonyImg from "@/assets/products/sony-wh1000xm5.png";
import ipadProImg from "@/assets/products/ipad-pro-m4.webp";
import iphoneXrImg from "@/assets/products/iphone-xr.webp";
import iphoneXImg from "@/assets/products/iphone-x.webp";
import iphoneXsMaxImg from "@/assets/products/iphone-xs-max.webp";
import iphone11Img from "@/assets/products/iphone-11.webp";
import iphoneAirImg from "@/assets/products/iphone-air.webp";

// Model-specific iPhone images
import iphone11ProMaxImg from "@/assets/products/iphone-11-pro-max.jpeg";
import iphone11ProImg from "@/assets/products/iphone-11-pro.jpeg";
import iphone12Img from "@/assets/products/iphone-12.webp";
import iphone12ProImg from "@/assets/products/iphone-12-pro.webp";
import iphone12ProMaxImg from "@/assets/products/iphone-12-pro-max.webp";
import iphone13Img from "@/assets/products/iphone-13.webp";
import iphone13ProImg from "@/assets/products/iphone-13-pro.webp";
import iphone13ProMaxImg from "@/assets/products/iphone-13-pro-max.webp";
import iphone14Img from "@/assets/products/iphone-14.webp";
import iphone14ProImg from "@/assets/products/iphone-14-pro.webp";
import iphone14ProMaxImg from "@/assets/products/iphone-14-pro-max.webp";
import iphone15Img from "@/assets/products/iphone-15.webp";
import iphone15ProImg from "@/assets/products/iphone-15-pro.webp";
import iphone15ProMaxImg from "@/assets/products/iphone-15-pro-max-new.jpeg";
import iphone16Img from "@/assets/products/iphone-16.webp";
import iphone16ProImg from "@/assets/products/iphone-16-pro.webp";
import iphone16ProMaxImg from "@/assets/products/iphone-16-pro-max.webp";
import iphone17Img from "@/assets/products/iphone-17.webp";
import iphone17ProImg from "@/assets/products/iphone-17-pro.webp";
import iphone17ProMaxImg from "@/assets/products/iphone-17-pro-max.webp";
import iphoneDualImg from "@/assets/products/iphone-dual-cam.png";

// iPad images
import ipad8thImg from "@/assets/products/ipad-8th-gen.webp";
import ipad9thImg from "@/assets/products/ipad-9th-gen.webp";
import ipad10thImg from "@/assets/products/ipad-10th-gen.webp";
import ipad11thImg from "@/assets/products/ipad-11th-gen.webp";
import ipadMini4Img from "@/assets/products/ipad-mini-4.webp";
import ipadMini5Img from "@/assets/products/ipad-mini-5.webp";
import ipadMini6Img from "@/assets/products/ipad-mini-6.webp";
import ipadMini7Img from "@/assets/products/ipad-mini-7.webp";

const exactMap: Record<string, string> = {
  // iPhone 11
  "iphone-11-64": iphone12Img,
  "iphone-11-128": iphone12Img,
  "iphone-11-pro-64": iphone11ProImg,
  "iphone-11-pro-256": iphone11ProImg,
  "iphone-11-pro-max-64": iphone11ProMaxImg,
  "iphone-11-pro-max-256": iphone11ProMaxImg,
  // iPhone 12
  "iphone-12-64": iphone12Img,
  "iphone-12-128": iphone12Img,
  "iphone-12-pro-128": iphone12ProImg,
  "iphone-12-pro-256": iphone12ProImg,
  "iphone-12-pro-max-128": iphone12ProMaxImg,
  "iphone-12-pro-max-256": iphone12ProMaxImg,
  // iPhone 13
  "iphone-13-128": iphone13Img,
  "iphone-13-256": iphone13Img,
  "iphone-13-pro-128": iphone13ProImg,
  "iphone-13-pro-max-128": iphone13ProMaxImg,
  "iphone-13-pro-max-256": iphone13ProMaxImg,
  // iPhone 14
  "iphone-14-128": iphone14Img,
  "iphone-14-256": iphone14Img,
  "iphone-14-plus-128": iphone14Img,
  "iphone-14-plus-256": iphone14Img,
  "iphone-14-pro-128": iphone14ProImg,
  "iphone-14-pro-256": iphone14ProImg,
  "iphone-14-pro-max-128": iphone14ProMaxImg,
  "iphone-14-pro-max-256": iphone14ProMaxImg,
  // iPhone 15
  "iphone-15-128": iphone15Img,
  "iphone-15-256": iphone15Img,
  "iphone-15-plus-128": iphone15Img,
  "iphone-15-pro-max": iphone15ProMaxImg,
  // iPhone 16
  "iphone-16-128": iphone16Img,
  // Non-iPhone
  "samsung-s24-ultra": samsungImg,
  "airpods-pro-2": airpodsImg,
  "ps5-slim": ps5Img,
  "apple-watch-ultra-2": watchImg,
  "sony-wh1000xm5": sonyImg,
  // iPads
  "ipad-mini-4-128": ipadMini4Img,
  "ipad-mini-5-64": ipadMini5Img,
  "ipad-mini-5-256": ipadMini5Img,
  "ipad-mini-7-128-new": ipadMini7Img,
  "ipad-mini-7-256-new": ipadMini7Img,
  "ipad-8-32": ipad8thImg,
  "ipad-8-128": ipad8thImg,
  "ipad-9-64": ipad9thImg,
  "ipad-9-256": ipad9thImg,
  "ipad-10-64-used": ipad10thImg,
  "ipad-10-64-new": ipad10thImg,
  "ipad-11-128-new": ipad11thImg,
  "ipad-11-256-new": ipad11thImg,
};

function getImageForId(id: string): string {
  if (exactMap[id]) return exactMap[id];
  // XR single cam
  if (id.startsWith("iphone-xr")) return iphoneXrImg;
  // XS Max dual
  if (id.startsWith("iphone-xs")) return iphoneXsMaxImg;
  // Fallbacks by generation
  if (id.startsWith("iphone-17-pro-max")) return iphone17ProMaxImg;
  if (id.startsWith("iphone-17-pro")) return iphone17ProImg;
  if (id.startsWith("iphone-17")) return iphone17Img;
  if (id.startsWith("iphone-16-pro-max")) return iphone16ProMaxImg;
  if (id.startsWith("iphone-16-pro")) return iphone16ProImg;
  if (id.startsWith("iphone-16")) return iphone16Img;
  if (id.startsWith("iphone-15-pro")) return iphone15ProImg;
  if (id.startsWith("iphone-15")) return iphone15Img;
  if (id.startsWith("iphone-14-pro")) return iphone14ProImg;
  if (id.startsWith("iphone-14")) return iphone14Img;
  if (id.startsWith("iphone-13-pro")) return iphone13ProImg;
  if (id.startsWith("iphone-13")) return iphone13Img;
  if (id.startsWith("iphone-12-pro")) return iphone12ProImg;
  if (id.startsWith("iphone-12")) return iphone12Img;
  if (id.startsWith("iphone-11")) return iphone11Img;
  if (id.startsWith("iphone-air")) return iphoneAirImg;
  if (id.startsWith("iphone")) return iphoneXImg;
  // Macs
  if (id.startsWith("mba")) return macbookAirImg;
  if (id.startsWith("mbp") || id.startsWith("macbook")) return macbookImg;
  // iPads
  if (id.startsWith("ipad-mini-7")) return ipadMini7Img;
  if (id.startsWith("ipad-mini-6")) return ipadMini6Img;
  if (id.startsWith("ipad-mini-5")) return ipadMini5Img;
  if (id.startsWith("ipad-mini-4")) return ipadMini4Img;
  if (id.startsWith("ipad-mini")) return ipadMini5Img;
  if (id.startsWith("ipad-11")) return ipad11thImg;
  if (id.startsWith("ipad-10")) return ipad10thImg;
  if (id.startsWith("ipad-9")) return ipad9thImg;
  if (id.startsWith("ipad-8")) return ipad8thImg;
  if (id.startsWith("ipad-7")) return ipad8thImg;
  if (id.startsWith("ipad-6")) return ipad8thImg;
  if (id.startsWith("ipad-air")) return ipad10thImg;
  if (id.startsWith("ipad")) return ipadProImg;
  return "/placeholder.svg";
}

import { products } from "./products";
export const productImages: Record<string, string> = Object.fromEntries(
  products.map(p => [p.id, getImageForId(p.id)])
);
