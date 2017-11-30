import moment from 'moment';

export function configureMoment() {
  moment.updateLocale('en', {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: '1s',
      ss: '%ds',
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1m",
      MM: "%dm",
      y: "1y",
      yy: "%dy"
    }
  });
}
