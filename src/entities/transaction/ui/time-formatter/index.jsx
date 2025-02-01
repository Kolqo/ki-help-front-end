import { formatInTimeZone } from 'date-fns-tz';
import { uk } from 'date-fns/locale';

export default function TimeFormatter(props) {
  const formatDate = (dateString) => {
    const timeZone = 'Europe/Kiev';
    return formatInTimeZone(
      new Date(dateString),
      timeZone,
      'd MMMM, HH:mm',
      { locale: uk }
    );
  };

  return <>{formatDate(props.utcDateString)}</>;
}
