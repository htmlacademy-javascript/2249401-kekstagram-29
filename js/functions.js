const isWorktime = (startOfWorkday, endOfWorkday, startOfMeeting, meetingDuration) => {
  // Преобразуем время начала рабочего дня в минуты
  const [startOfWorkdayHours, startOfWorkdayMinutes] = startOfWorkday.split(':').map(Number);
  const startOfWorkdayInMinutes = startOfWorkdayHours * 60 + startOfWorkdayMinutes;

  // Преобразуем время окончания рабочего дня в минуты
  const [endOfWorkdayHours, endOfWorkdayMinutes] = endOfWorkday.split(':').map(Number);
  const endOfWorkdayInMinutes = endOfWorkdayHours * 60 + endOfWorkdayMinutes;

  // Преобразуем время начала встречи в минуты
  const [startOfMeetingHours, startOfMeetingMinutes] = startOfMeeting.split(':').map(Number);
  const startOfMeetingInMinutes = startOfMeetingHours * 60 + startOfMeetingMinutes;

  // Вычисляем время окончания встречи в минутах
  const endOfMeetingInMinutes = startOfMeetingInMinutes + meetingDuration;

  // Проверяем, находится ли время начала и окончания встречи внутри рабочего дня
  return (
    startOfWorkdayInMinutes <= startOfMeetingInMinutes &&
    endOfWorkdayInMinutes >= endOfMeetingInMinutes
  );
};

isWorktime('08:00', '17:30', '14:00', 90);
