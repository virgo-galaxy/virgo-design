import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import CalendarBasicExample from './CalendarBasicExample';
import style0 from './CalendarBasicExample.module.scss?virgo-raw';
import source0 from './CalendarBasicExample.tsx?raw';
import CalendarConstraintsExample from './CalendarConstraintsExample';
import style1 from './CalendarConstraintsExample.module.scss?virgo-raw';
import source1 from './CalendarConstraintsExample.tsx?raw';
import CalendarPanelExample from './CalendarPanelExample';
import style2 from './CalendarPanelExample.module.scss?virgo-raw';
import source2 from './CalendarPanelExample.tsx?raw';
export const calendarExamples = {
  example2: {
    id: 'calendar-panel',
    title: 'Basic calendar panel',
    titleTranslationKey: 'examples.calendar.copy.title2',
    description: 'A full-width calendar with year and month selection and month/year views.',
    descriptionTranslationKey: 'examples.calendar.copy.description2',
    Component: CalendarPanelExample,
    source: createExampleSource(source2),
    styleSource: style2,
  },
  example0: {
    id: 'calendar-basic',
    title: 'Localized month navigation',
    titleTranslationKey: 'examples.calendar.copy.title0',
    description: 'Focus navigation does not select a date.',
    descriptionTranslationKey: 'examples.calendar.copy.description0',
    Component: CalendarBasicExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example1: {
    id: 'calendar-constraints',
    title: 'Bounds and unavailable days',
    titleTranslationKey: 'examples.calendar.copy.title1',
    description: 'Controlled month navigation and unavailable weekends.',
    descriptionTranslationKey: 'examples.calendar.copy.description1',
    Component: CalendarConstraintsExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
