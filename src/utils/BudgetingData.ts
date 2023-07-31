import { nanoid } from "nanoid";
import Period from "./Period";

const budgetingData = [
    {
        id: nanoid(),
        budgetingData: {
            amount: 2000000,
            budgetDate: new Date(),
            category: "contoh",
            period: Period.Custom,
            title: "Pangan",
            trackType: true,
        },
        current: 1000000,
        showPercent: false,
        isOpened: false,
    },

    {
        id: nanoid(),
        budgetingData: {
            amount: 2500000,
            budgetDate: new Date(),
            category: "contoh",
            period: Period.Weekly,
            title: "Papan",
            trackType: false,
        },
        current: 1500000,
        showPercent: false,
        isOpened: false,
    },
    {
        id: nanoid(),
        budgetingData: {
            amount: 150000,
            budgetDate: new Date(),
            category: "contoh",
            period: Period.Monthly,
            title: "Sandang",
            trackType: false,
        },
        current: 50000,
        showPercent: false,
        isOpened: false,
    },
    {
        id: nanoid(),
        budgetingData: {
            amount: 1_000_000,
            budgetDate: new Date(),
            category: "contoh",
            period: Period.Monthly,
            title: "Rekreasi",
            trackType: true,
        },
        current: 100_000,
        showPercent: false,
        isOpened: false,
    }
]

export default budgetingData;