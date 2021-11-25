// Attribution Roshin Nishad 2021 Nov | GetPsyched6 © | MIT License
let target;
let dd = document.getElementsByClassName("days");
let hh = document.getElementsByClassName("hours");
let mm = document.getElementsByClassName("minutes");
let ss = document.getElementsByClassName("seconds");
let namech = document.getElementsByClassName("name");

const target_acquired = (
	t_year = 2021,
	t_month = 11,
	t_day = 2,
	t_hour = 1,
	t_min = 0,
	t_sec = 0
) => {
	let target_year = t_year; //2021
	let target_month = t_month; //11
	let target_day = t_day; //2
	let target_hour = t_hour; //1
	let target_minute = t_min; //0
	let target_second = t_sec; //0
	target = new Date(
		target_year,
		target_month,
		target_day,
		target_hour,
		target_minute,
		target_second
	);
};

const minutes_to_midnight = () => {
	target_acquired();
	setInterval(countdown, 1000);
};

const countdown = () => {
	let date = Date.now();
	let ms_diff = target.getTime() - date;
	let day = Math.floor(ms_diff / 86400000);
	let hour = Math.floor(ms_diff / 3600000 - day * 24);
	let minute = Math.floor(ms_diff / 60000 - day * 1440 - hour * 60);
	let second = Math.floor(
		ms_diff / 1000 - day * 86400 - hour * 3600 - minute * 60
	);

	if (day < 10) dd[0].innerText = `0${day}`;
	else dd[0].innerText = `${day}`;
	if (hour < 10) hh[0].innerText = `0${hour}`;
	else hh[0].innerText = `${hour}`;
	if (minute < 10) mm[0].innerText = `0${minute}`;
	else mm[0].innerText = `${minute}`;
	if (second < 10) ss[0].innerText = `0${second}`;
	else ss[0].innerText = `${second}`;

	if (day == 1)
		document.documentElement.style.setProperty("--dd-text", '" DAY"');
	else document.documentElement.style.setProperty("--dd-text", '"DAYS"');
	if (hour == 1)
		document.documentElement.style.setProperty("--hh-text", '" HOUR"');
	else document.documentElement.style.setProperty("--hh-text", '"HOURS"');
	if (minute == 1)
		document.documentElement.style.setProperty("--mm-text", '" MINUTE"');
	else document.documentElement.style.setProperty("--mm-text", '"MINUTES"');
	if (second == 1)
		document.documentElement.style.setProperty("--ss-text", '" SECOND"');
	else document.documentElement.style.setProperty("--ss-text", '"SECONDS"');
};

const change = () => {
	let names = "arrival";
	names = prompt("Edit Name of Countdown");
	if (names != null) namech[0].innerText = names;
};

const newtimer = () => {
	alert("Enter the Target Year, Month, Day, Hour and Second.");
	let new_year = parseInt(
		prompt("Enter Target Year (4 digits, Example: 2021)")
	);
	if (isNaN(new_year)) new_year = 2022;
	let new_month = parseInt(prompt("Enter Target Month (1 Jan - 12 Dec)"), 10);
	new_month--;
	if (isNaN(new_month)) new_month = 0;
	let new_day = parseInt(prompt("Enter Target Day (1st to 30/31st)"), 10);
	if (isNaN(new_day)) new_day = 0;
	let new_hour = parseInt(prompt("Enter Target Hour (Hour 0 to 23)"), 10);
	if (isNaN(new_hour)) new_hour = 0;
	let new_minute = parseInt(prompt("Enter Target Minute (0 to 59)"), 10);
	if (isNaN(new_minute)) new_minute = 0;
	let new_second = parseInt(prompt("Enter Target Second (0 to 59)"), 10);
	if (isNaN(new_second)) new_second = 0;
	console.log(new_year, new_month, new_day, new_hour, new_minute, new_second);
	target_acquired(
		new_year,
		new_month,
		new_day,
		new_hour,
		new_minute,
		new_second
	);
};
