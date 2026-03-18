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

// Triple-cam Pro iPhones
const tripleCamIds = new Set([
  "iphone-11-pro-64", "iphone-11-pro-256",
  "iphone-11-pro-max-64", "iphone-11-pro-max-256",
  "iphone-12-pro-128", "iphone-12-pro-256",
  "iphone-12-pro-max-128", "iphone-12-pro-max-256",
  "iphone-13-pro-128", "iphone-13-pro-max-128", "iphone-13-pro-max-256",
  "iphone-14-pro-128", "iphone-14-pro-256",
  "iphone-15-pro-max",
]);

// Single-cam iPhones
const singleCamIds = new Set(["iphone-xr-64", "iphone-xr-128"]);

// XS Max has dual cam
const dualCamIds = new Set([
  "iphone-xs-max-64", "iphone-xs-max-256",
  "iphone-11-128", "iphone-11-64",
  "iphone-12-64", "iphone-12-128",
  "iphone-13-128", "iphone-13-256",
  "iphone-14-128", "iphone-14-256",
  "iphone-14-plus-128", "iphone-14-plus-256",
  "iphone-15-128", "iphone-15-256", "iphone-15-plus-128",
  "iphone-16-128",
]);

const exactMap: Record<string, string> = {
  "samsung-s24-ultra": samsungImg,
  "airpods-pro-2": airpodsImg,
  "ps5-slim": ps5Img,
  "apple-watch-ultra-2": watchImg,
  "sony-wh1000xm5": sonyImg,
};

function getImageForId(id: string): string {
  if (exactMap[id]) return exactMap[id];
  if (tripleCamIds.has(id)) return iphoneImg;
  if (singleCamIds.has(id)) return iphoneSingleImg;
  if (dualCamIds.has(id)) return iphoneDualImg;
  if (id.startsWith("iphone")) return iphoneDualImg;
  if (id.startsWith("mba")) return macbookAirImg;
  if (id.startsWith("mbp") || id.startsWith("macbook")) return macbookImg;
  if (id.includes("mini")) return ipadMiniImg;
  if (id.startsWith("ipad-air") || id.startsWith("ipad-10") || id.startsWith("ipad-11")) return ipadImg;
  if (id.startsWith("ipad")) return ipadStdImg;
  return "/placeholder.svg";
}

import { products } from "./products";
export const productImages: Record<string, string> = Object.fromEntries(
  products.map(p => [p.id, getImageForId(p.id)])
);
