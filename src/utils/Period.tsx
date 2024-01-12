export enum Period {
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
  Custom = "Custom",
}

export function convertToPeriod(
  isRecurring: boolean,
  startDate: Date,
  endDate: Date
): Period {
  if (!isRecurring) {
    return Period.Custom;
  }
  if (
    startDate.getDate() === endDate.getDate() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return Period.Daily;
  }
  if (
    startDate.getDay() === endDate.getDay() &&
    Math.abs(startDate.getDate() - endDate.getDate()) === 7
  ) {
    return Period.Weekly;
  }
  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === 1 &&
    endDate.getDate() ===
      new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()
  ) {
    return Period.Monthly;
  }
  return Period.Custom;
}

export default Period;
