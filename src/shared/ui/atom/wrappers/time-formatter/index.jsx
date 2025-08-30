import { formatInTimeZone } from 'date-fns-tz'
import { uk } from 'date-fns/locale'

export default function TimeFormatter({
	utcDateString,
	format = 'd MMMM, HH:mm, y',
}) {
	const timeZone = 'Europe/Kiev'

	const formatDate = dateString => {
		return formatInTimeZone(new Date(dateString), timeZone, format, {
			locale: uk,
		})
	}

	return <>{formatDate(utcDateString)}</>
}
