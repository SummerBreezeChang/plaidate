// app/lib/mock.ts
export type AgendaItem = { title: string; time: string; place: string };

export type Plaidate = {
  id: string;
  title: string;
  when: string;     // e.g., "Sat 10:00–11:30"
  city: string;     // e.g., "Oakland"
  age: string;      // e.g., "3–5"
  capacity: number; // total
  spots: number;    // remaining
  agenda: AgendaItem[];
  hosting?: boolean;
};

export const MOCK_PLAIDATES: Plaidate[] = [
  {
    id: "1",
    title: "Park + Snack",
    when: "Sat 10:00–11:30",
    city: "Oakland",
    age: "3–5",
    capacity: 6,
    spots: 2,
    agenda: [
      { title: "Playground", time: "10:00", place: "Dimond Park" },
      { title: "Snack", time: "11:00", place: "Picnic tables" },
    ],
    hosting: true,
  },
  {
    id: "2",
    title: "Practice + Brunch",
    when: "Sun 09:00–11:00",
    city: "Berkeley",
    age: "6–8",
    capacity: 6,
    spots: 0,
    agenda: [
      { title: "Soccer", time: "09:00", place: "Cedar Rose Park" },
      { title: "Cafe", time: "10:15", place: "Fatapple’s" },
    ],
  },
];
