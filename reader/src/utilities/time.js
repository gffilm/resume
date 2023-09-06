

export function timeFromNow(seconds) {
  const futureDate = new Date();
  futureDate.setSeconds(futureDate.getSeconds() + seconds);
  return futureDate.getTime();
}