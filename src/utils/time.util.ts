/**
 *
 * @returns 01부터 23시까지 H:mm A 형태의 리스트로 반환
 */
export const getTime = () => {
  const timeList = [];

  for (let i = 0; i <= 23; i++) {
    const time = {
      label: i + ":00",
      value: i,
    };
    timeList.push(time);
  }

  return timeList;
};

/**
 *
 * @param time 1200, 300 형식으로 파라미터를 받았을 때
 * @returns 12:00, 3:00 형식으로 반환
 */
export const timeFormat = (time: string) => {
  if (time.length === 3) {
    const newTime = time.substring(0, 1) + ":00";
    return newTime;
  } else {
    const newTime = time.substring(0, 2) + ":00";
    return newTime;
  }
};
