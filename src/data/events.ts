// ---------------------------------------------------------------------------
// PVRAC race & event calendar
// ---------------------------------------------------------------------------
// This is the ONLY file you edit to update the Calendar page.
//
// TO ADD AN EVENT:
//   1. Copy one of the blocks in the list below.
//   2. Paste it into the list and fill in the fields.
//   3. Save, commit and push. That's it.
//
// You do NOT need to remove old races — once a race date has passed it drops
// off the upcoming list automatically. When you add a `resultsUrl` and/or a
// `photo` to a race that has already happened, it becomes the "Latest race"
// highlight at the top of the page.
//
// FIELDS  (only `date` and `title` are required — leave the rest out if unused):
//   date             'YYYY-MM-DD'  e.g. '2026-08-15'   (required)
//   title            Race / event name                 (required)
//   location         Where it is
//   distances        e.g. ['42.2 km', '21.1 km', '10 km']
//   registrationUrl  Link to enter (shown for upcoming races)
//   resultsUrl       Link to results (add after the race)
//   photo            '/images/races/your-photo.jpg' (add after the race)
//   note             One short extra line
// ---------------------------------------------------------------------------

export type ClubEvent = {
  date: string;
  title: string;
  location?: string;
  distances?: string[];
  registrationUrl?: string;
  resultsUrl?: string;
  photo?: string;
  note?: string;
};

export const EVENTS: ClubEvent[] = [
  // ===== EXAMPLES — replace these with your real races before going live =====
  {
    date: '2026-07-25',
    title: 'TUT Corporate Race',
    location: 'TUT Pretoria West campus',
    distances: ['21.1 km', '10 km'],
    
  },
  {
    date: '2026-08-08',
    title: 'Eyethu Fitness Test',
    location: 'Quagga Shopping Centre',
    distances: ['32 km','21.1 km','10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/83930-eyethu-fitness-test',
  },
  {
    date: '2026-08-23',
    title: 'ABSA Run Your City Tshwane',
    location: 'Union Buildings',
    distances: ['10 km'],
	  resultsUrl: 'https://live.ultimate.dk/desktop/front/index.php?eventid=7689',
    photo:'/images/races/ABSA_Tshwane.webp'
  },
  {
    date: '2026-07-04',
    title: 'Garsfontein Ice Breaker',
    location: 'Pretoria',
    distances: ['21.1 km', '10 km', '5 km'],
    resultsUrl: 'https://results.finishtime.co.za/results.aspx?CId=35&RId=5829',
    photo: '/images/races/icebreaker.webp',
  },
{
    date: '2026-08-26',
    title: 'PVR Dorpsfees Night Race',
    location: 'PVR Geloofsfamilie',
    distances: ['10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/83946-pvr-dorpsfees-night-race',
  },
  {
    date: '2026-08-29',
    title: 'Ultimate Fast Challenge',
    location: 'Kolonnade Retail Park',
    distances: ['10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/83746-ultimate-fast-challenge-race',
  },
  {
    date: '2026-08-30',
    title: "Linton's Corner Spring Race",
    location: "Linton's Corner Shopping Centre",
    distances: ['21.1 km', '10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/83243-lintons-corner',
  },
  {
    date: '2026-09-09',
    title: "Sappi Tuks night race",
    location: "Hillcrest Sports Campus",
    distances: ['10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/83963-sappi-tuks-night-race',
  },
  {
    date: '2026-09-05',
    title: "Brooklyn Road Race 2026",
    location: "Brooklyn Mall",
    distances: ['33 km', '21.1 km', '10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/83841-brooklyn-race',
  },
   {
    date: '2026-09-13',
    title: "Kit Kat Marathon 2026",
    location: "Pretoria",
    distances: ['42.2 km', '21.1 km', '10 km', '5 km'],
    registrationUrl: 'https://entrygeek.co.za/events/kit-kat-marathon-2026/',
  },  
   {
    date: '2026-09-19',
    title: "Exxaro Road Race Challenge 2026",
    location: "SuperSport Park",
    distances: ['21.1 km', '10 km', '5 km'],
    registrationUrl: 'https://secure.onreg.com/onreg2/front/step1.php?id=7905',
  }, 
   {
    date: '2026-09-12',
    title: "Spirit of Flight 2026",
    location: "AFB Swartkop",
    distances: ['10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/84191-spirit-of-flight',
  }, 
  {
    date: '2026-11-14',
    title: "Tom Jenkins Challenge 2026",
    location: "Union Buildings",
    distances: ['21.1 km','10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/84284-tom-jenkins-challenge',
  }, 
  // Once a race is done, add resultsUrl and photo and it becomes the
  // "Latest race" highlight at the top. Example:
  // {
  //   date: '2026-07-12',
  //   title: 'Winter Half Marathon',
  //   location: 'Centurion',
  //   distances: ['21.1 km', '10 km'],
  //   resultsUrl: 'https://results.example.com/winter-half-2026',
  //   photo: '/images/races/winter-half-2026.jpg',
  // },
];
