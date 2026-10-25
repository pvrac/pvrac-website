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
//
// CLUB EVENTS (socials, training days, prize-givings, etc.):
//   type             'event'  (leave out for a race — races are the default)
//   description      A short sentence or two about the event
//   photo            '/images/events/your-photo.jpg' (shown on the event card
//                    while it is upcoming; put the file in public/images/events/)
//   Events can also use location and note. (No entry button is shown for events.)
//   Events never appear in the "Latest race" highlight.
// ---------------------------------------------------------------------------

export type ClubEvent = {
  date: string;
  title: string;
  type?: 'race' | 'event';
  description?: string;
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
    title: "Sappi Tuks Night Race",
    location: "Hillcrest Sports Campus",
    distances: ['10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/83963-sappi-tuks-night-race',
  },
  {
    date: '2026-09-05',
    title: "Brooklyn Road Race 2026",
    location: "Brooklyn Mall",
    distances: ['33 km', '21.1 km', '10 km', '5 km'],
    resultsUrl: 'https://results.finishtime.co.za/results.aspx?CId=35&RId=5946',
    photo: '/images/races/Brooklyn.webp',
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
    resultsUrl: 'https://live.ultimate.dk/desktop/front/index.php?eventid=7905',
    photo: '/images/races/Exxaro.webp',
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
    {
    date: '2026-10-03',
    title: "Chamberlain Capital Classic 2026",
    location: "PHSOB CLUB",
    distances: ['21.1 km','10 km', '5 km'],
    resultsUrl: 'https://results.finishtime.co.za/results.aspx?CId=35&RId=8104',
    photo: '/images/races/Chamberlains.webp',
  }, 
   {
    date: '2026-10-17',
    title: "CSIR Road Race 2026",
    location: "CSIR Main Campus",
    distances: ['21.1 km','10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/83742-csir-2026',
  }, 
  {
    date: '2026-10-24',
    title: "aQuelle Jacaranda City Challenge 2026",
    location: "Rietondale High School",
    distances: ['42.2km','21.1 km','10 km', '5 km'],
    resultsUrl: 'https://results.finishtime.co.za/results.aspx?CId=35&RId=8140',
     photo: '/images/races/Jacaranda.webp',
  }, 
  {
    date: '2026-10-31',
    title: "Irene Farm Race with Discovery Vitality 2026",
    location: "ARC Campus",
    distances: ['21.1 km','10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/84315-irene-farm-race/',
  }, 
    {
    date: '2026-11-07',
    title: "Tshwane Oppie Bol",
    location: "Defence Sports Grounds",
    distances: ['21.1 km','10 km', '5 km','1 mile'],
    registrationUrl: 'https://www.entryninja.com/events/83768-oppie-bol-2026',
  }, 
  {
    date: '2026-11-28',
    title: "Black Diamonds Race",
    location: "Akasia Community Hall",
    distances: ['21.1 km','10 km', '5 km'],
    registrationUrl: 'https://www.entryninja.com/events/84319',
  }, 
  {
    date: '2026-12-16',
    title: "City60 Marathon 2026",
    location: "Church Square,Pretoria",
    distances: ['60 km','4x15 km','10 km', '5 km'],
    registrationUrl: 'https://entrygeek.co.za/events/city60-marathon-2026/',
  },
  {
     type: 'event',
     date: '2026-10-27',
     title: 'Pink Breast Cancer Time Trial',
     location: 'Church',
     description: "Time trial with braai afterwards. Bring ladies' toiletries or sanitary pads.",
     photo: '/images/events/PinkBreast.webp',
  },
  {
     type: 'event',
     date: '2026-12-4',
     title: "Einstein's 10 Day Charity Challenge Day 1",
     location: 'tbd',
     description: 'Details soon',
     //photo: '/images/events/PinkBreast.webp',
  },
  {
     type: 'event',
     date: '2026-12-5',
     title: "Year End Function",
     location: 'tbd',
     description: 'Details soon',
     //photo: '/images/events/PinkBreast.webp',
  },
  {
     type: 'event',
     date: '2026-12-18',
     title: "Waterkloof Christmas Lights Run",
     location: 'tbd',
     description: 'Details soon',
     //photo: '/images/events/PinkBreast.webp',
  },
  {
     type: 'event',
     date: '2026-12-16',
     title: "Pancake Run",
     location: 'tbd',
     description: 'Details soon',
     //photo: '/images/events/PinkBreast.webp',
  },
];
