import { nanoid } from "nanoid";

const trackingData = [
  {
    id: nanoid(),
    isOpened : false,
    trackingName: "Nasi padang",
    amount: 20000,
    trackDate: new Date(),
    category: "contoh",
    trackType: true,
  },
  {
    id: nanoid(),
    isOpened : false,
    trackingName: "Minum minum",
    amount: 230000,
    trackDate: new Date(),
    category: "contoh",
    trackType: true,
  },
  {
    id: nanoid(),
    isOpened : false,
    trackingName: "Nasi Goreng",
    amount: 120000,
    trackDate: new Date(),
    category: "contoh",
    trackType: true,
  },
  {
    id: nanoid(),
    isOpened : false,
    trackingName: "Utang ajra",
    amount: 100000000,
    trackDate: new Date(),
    category: "contoh",
    trackType: true,
  },
];

export default trackingData;