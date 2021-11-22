//! Attribution Roshin Nishad 2021 Nov | GetPsyched6 © | MIT License

let date = new Date();
const months = date.getMonth();
const hours = date.getHours();
const days = date.getDate();
let target_month = 11;
let target_day = 1;
let target_hour = 20;
let target_minute = 59;
let target_second = 59;
let dd = document.getElementsByClassName("days");
let hh = document.getElementsByClassName("hours");
let mm = document.getElementsByClassName("minutes");
let ss = document.getElementsByClassName("seconds");
let namech = document.getElementsByClassName("name");
new_months = [];
const mon_days = {
  0: 31,
  1: 29,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
};

const minutes_to_midnight = () => {
  if (Math.abs(target_day - days) == 0) return;
  else {
    for (var i = months + 1; i <= target_month; i++) {
      new_months.push(i);
    }
    target_day -= 1;
    for (var i = 0; i < new_months.length; i++) {
      target_day += mon_days[new_months[i]];
    }
    setInterval(timedown, 1000);
  }
};

const timedown = () => {
  let date = new Date();
  const [months, days, hours, minutes, seconds] = [
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  if (Math.abs(target_day - days) == 0) return;
  else {
    if (Math.abs(target_day - days) < 10)
      dd[0].innerText = `0${Math.abs(target_day - days)}`;
    else dd[0].innerText = `${Math.abs(target_day - days)}`;
    if (Math.abs(target_hour - hours) < 10)
      hh[0].innerText = `0${Math.abs(target_hour - hours)}`;
    else hh[0].innerText = `${Math.abs(target_hour - hours)}`;
    if (Math.abs(minutes - target_minute) < 10)
      mm[0].innerText = `0${Math.abs(minutes - target_minute)}`;
    else mm[0].innerText = `${Math.abs(minutes - target_minute)}`;
    if (Math.abs(seconds - target_second) < 10)
      ss[0].innerText = `0${Math.abs(seconds - target_second)}`;
    else ss[0].innerText = `${Math.abs(seconds - target_second)}`;
    if (Math.abs(target_day - days) == 1)
      document.documentElement.style.setProperty("--dd-text", '" DAY"');
    else document.documentElement.style.setProperty("--dd-text", '"DAYS"');
    if (Math.abs(target_hour - hours) == 1)
      document.documentElement.style.setProperty("--hh-text", '" HOUR"');
    else document.documentElement.style.setProperty("--hh-text", '"HOURS"');
    if (Math.abs(minutes - target_minute) == 1)
      document.documentElement.style.setProperty("--mm-text", '" MINUTE"');
    else document.documentElement.style.setProperty("--mm-text", '"MINUTES"');
    if (Math.abs(seconds - target_second) == 1)
      document.documentElement.style.setProperty("--ss-text", '" SECOND"');
    else document.documentElement.style.setProperty("--ss-text", '"SECONDS"');
  }
};

const change = () => {
  let names = "arrival";
  names = prompt("Edit Name of Countdown");
  if (names != null) namech[0].innerText = names;
};

const newtimer = () => {
  alert("Enter the Target Month, Day, Hour and Second.");
  target_month = prompt("Enter Target Month (1 - Jan to 12 - Dec)");
  target_month--;
  if (target_month == null) target_month = 0;
  target_day = prompt("Enter Target Day (1st to 30/31st)");
  target_day--;
  if (target_day == null) target_day = 0;
  target_hour = prompt("Enter Target Hour (0 Midnight to Hour 23)");
  if (target_hour == null) target_hour = 0;
  target_minute = prompt("Enter Target Minute (0 to 59)");
  if (target_minute == null) target_minute = 0;
  target_second = prompt("Enter Target Second (0 to 59)");
  if (target_second == null) target_second = 0;
};
