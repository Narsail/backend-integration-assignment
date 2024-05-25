export function provideDatesForLastDays(numberOfDays: number): Date[] {
  if (numberOfDays <= 0) { return [] }
  
  numberOfDays -= 1
  
  const today = new Date();
  let dates: Date[] = [today]
  
  while (numberOfDays > 0) {
    dates.push(
      new Date(new Date().setDate(today.getDate() - numberOfDays))
    )
    numberOfDays -= 1
  }
  return dates
}