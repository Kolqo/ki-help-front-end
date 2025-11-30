import { formatInTimeZone } from 'date-fns-tz'
import {
	formatDistanceToNowStrict,
	differenceInDays,
	isSameYear,
} from 'date-fns'
import { uk } from 'date-fns/locale'

export default function TimeFormatter({ utcDateString }) {
	const timeZone = 'Europe/Kiev'
	const date = new Date(utcDateString)
	const now = new Date()

	const daysDiff = differenceInDays(now, date)

	if (daysDiff < 30) {
		return (
			<>
				{formatDistanceToNowStrict(date, {
					addSuffix: true, 
					locale: uk,
				})}
			</>
		)
	}

	if (isSameYear(date, now)) {
		return <>{formatInTimeZone(date, timeZone, 'd MMMM', { locale: uk })}</>
	}

	return <>{formatInTimeZone(date, timeZone, 'd MMMM yyyy', { locale: uk })}</>
}
