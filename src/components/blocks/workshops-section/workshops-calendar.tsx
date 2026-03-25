import { useMemo } from 'react'
import FullCalendar from '@fullcalendar/react'
import type { EventContentArg, EventInput } from '@fullcalendar/core'
import huLocale from '@fullcalendar/core/locales/hu'
import dayGridPlugin from '@fullcalendar/daygrid'

type WorkshopCalendarEvent = {
  title: string
  date: string
  time?: string
  location: string
  facebookEventUrl: string
  registrationUrl: string
  isPast: boolean
}

type WorkshopsCalendarProps = {
  events: WorkshopCalendarEvent[]
}

const monthMap: Record<string, number> = {
  januar: 0,
  februar: 1,
  marcius: 2,
  aprilis: 3,
  majus: 4,
  junius: 5,
  julius: 6,
  augusztus: 7,
  szeptember: 8,
  oktober: 9,
  november: 10,
  december: 11
}

const normalizeDateKey = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const parseHungarianDate = (dateText: string): Date | null => {
  const cleanedDate = dateText
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const dateMatch = cleanedDate.match(/^(\d{4})\.\s*([a-z]+)\s*(\d{1,2})\.$/)

  if (!dateMatch) {
    return null
  }

  const year = Number(dateMatch[1])
  const month = monthMap[dateMatch[2]]
  const day = Number(dateMatch[3])

  if (!Number.isFinite(year) || month === undefined || !Number.isFinite(day)) {
    return null
  }

  return new Date(year, month, day)
}

const WorkshopsCalendar = ({ events }: WorkshopsCalendarProps) => {
  const parsedEvents = useMemo(() => {
    return events
      .map(event => {
        const parsedDate = parseHungarianDate(event.date)

        if (!parsedDate) {
          return null
        }

        return {
          ...event,
          dateKey: normalizeDateKey(parsedDate)
        }
      })
      .filter((event): event is (WorkshopCalendarEvent & { dateKey: string }) => event !== null)
  }, [events])

  const calendarEvents = useMemo(() => {
    return parsedEvents.map<EventInput>(event => ({
      title: event.title,
      start: event.dateKey,
      allDay: true,
      url: event.facebookEventUrl,
      classNames: ['mimoza-fc-event', event.isPast ? 'mimoza-fc-event--past' : 'mimoza-fc-event--upcoming'],
      extendedProps: {
        workshop: event
      }
    }))
  }, [parsedEvents])

  return (
    <div className='mimoza-calendar rounded-2xl border bg-card p-2 sm:p-4'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        locale={huLocale}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: ''
        }}
        height='auto'
        contentHeight='auto'
        aspectRatio={2.4}
        weekNumbers={false}
        fixedWeekCount={false}
        dayMaxEventRows={4}
        displayEventTime={false}
        events={calendarEvents}
        eventContent={(info: EventContentArg) => {
          const workshop = info.event.extendedProps.workshop as WorkshopCalendarEvent | undefined

          return (
            <div className='mimoza-fc-event-content'>
              <span className='mimoza-fc-event-title'>{info.event.title}</span>
              <span className='mimoza-fc-event-location'>{workshop?.location ?? ''}</span>
            </div>
          )
        }}
        eventDidMount={info => {
          const element = info.el as HTMLAnchorElement

          element.setAttribute('target', '_blank')
          element.setAttribute('rel', 'noreferrer')
        }}
      />
    </div>
  )
}

export default WorkshopsCalendar
