'use client';

import { useState } from 'react';
import styles from './page.module.css';

type Discipline = 'run-walk' | 'cycling';

const GELOOFSFAMILIE_MAP =
  'https://www.google.com/maps/search/?api=1&query=Pierre+van+Ryneveld+Geloofsfamilie';
const ABANTU_MAP =
  'https://www.google.com/maps/search/?api=1&query=Abantu+Coffee+Pierre+van+Ryneveld';

export default function AboutTabs() {
  const [discipline, setDiscipline] = useState<Discipline>('run-walk');

  return (
    <section className={styles.about}>
      <div className="container">
        <div className={styles.disciplinePicker}>
          <label htmlFor="discipline">Choose your discipline:</label>
          <select
            id="discipline"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value as Discipline)}
          >
            <option value="run-walk">🏃 Run / Walk</option>
            <option value="cycling">🚴 Cycling</option>
          </select>
        </div>

        {discipline === 'run-walk' ? <RunWalkContent /> : <CyclingContent />}
      </div>
    </section>
  );
}

function RunWalkContent() {
  return (
    <>
      <div className={styles.aboutContent}>
        <div className={styles.aboutText}>
          <p>
            Welcome to Pierre van Ryneveld Athletics Club, where passion meets pavement and
            every stride takes you higher. We&apos;re more than just a running club: we&apos;re
            a community of athletes who believe in pushing boundaries, supporting each other,
            and celebrating every kilometer.
          </p>
          <p>
            Whether you&apos;re a seasoned marathoner, walker, or just starting your fitness
            journey, you&apos;ll find your pace with us. Our diverse group welcomes runners and
            walkers of all abilities and ages, united by our love for sport and the open road.
          </p>
          <p>
            <strong>Race Day Benefits:</strong> At club-nominated race days, enjoy our
            hospitality gazebo and secure tog bag storage facilities, making your race day
            experience stress-free!
          </p>
        </div>

        <div className={styles.meetingInfo}>
          <h3>Training Sessions</h3>
          <ul className={styles.meetingTimes}>
            <li>
              <strong>Tuesdays &amp; Thursdays</strong>
              17:20 | Club Runs
              <br />
              <small>
                Meet at{' '}
                <a href={GELOOFSFAMILIE_MAP} target="_blank" rel="noopener noreferrer">
                  Pierre van Ryneveld Geloofsfamilie
                </a>
              </small>
            </li>
            <li>
              <strong>Saturday Mornings</strong>
              07:00 | Long Runs &amp; Social Km&apos;s
              <br />
              <small>
                Meet at{' '}
                <a href={ABANTU_MAP} target="_blank" rel="noopener noreferrer">
                  Abantu Coffee, Pierre van Ryneveld
                </a>
              </small>
            </li>
            <li>
              <strong>⏱️ Time Trials</strong>
              Every 2nd &amp; Last Tuesday of the month
              <br />
              <small>Test your fitness and track your progress!</small>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function CyclingContent() {
  return (
    <div className={styles.aboutContent}>
      <div className={styles.aboutText}>
        <p>
          Welcome to the Pierre van Ryneveld Athletics Club Cycling Community! Whether
          you&apos;re a seasoned cyclist chasing distance and speed, or simply looking to enjoy
          the freedom of riding with great people, you&apos;ll find a welcoming, supportive
          environment here. We focus on safe, no-drop rides, and both mountain bikes and road
          bikes are equally at home.
        </p>
        <p>
          Founded as an extension of the athletics club, our cycling community brings together
          passionate riders who share a love for fitness, friendship, and the open road. We
          ride together to encourage healthy lifestyles, build lasting connections, and create
          memorable experiences both on and off the bike, with group rides, social events,
          training opportunities, and a vibrant community atmosphere. Safety, camaraderie, and
          enjoyment are at the heart of everything we do.
        </p>
        <p>
          Whether your goal is to improve your fitness, prepare for races, explore new routes,
          or simply enjoy a good coffee after a ride, there&apos;s a place for you here. Join
          us as we ride stronger together, one kilometre at a time.
        </p>
      </div>

      <div className={styles.meetingInfo}>
        <h3>Training Rides</h3>
        <ul className={styles.meetingTimes}>
          <li>
            <strong>Tuesdays &amp; Thursdays</strong>
            17:30 (Winter 17:15) | Easy 10-12 km around PvR
            <br />
            <small>
              Meet at{' '}
              <a href={GELOOFSFAMILIE_MAP} target="_blank" rel="noopener noreferrer">
                Pierre van Ryneveld Geloofsfamilie
              </a>
            </small>
          </li>
          <li>
            <strong>Saturday Mornings</strong>
            06:00 (Winter 07:00) | Choice of distance: 16 km, 21 km, 50 km, 60 km+
            <br />
            <small>
              Meet at{' '}
              <a href={ABANTU_MAP} target="_blank" rel="noopener noreferrer">
                Abantu Coffee, Pierre van Ryneveld
              </a>
            </small>
          </li>
        </ul>
        <div className={styles.pricingNote}>
          <strong>💰 Cycling Costs</strong>
          Membership: R350
          <br />
          Club Cycle Shirt: R600
        </div>
      </div>
    </div>
  );
}
