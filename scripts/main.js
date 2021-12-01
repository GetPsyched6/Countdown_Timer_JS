//! Attribution Roshin Nishad 2021 Nov | GetPsyched6 © | MIT License
let target; // the target date it count downs to.
let interval; // how long set interval takes (default 1000ms)
let running; // the setInterval variable
let alarm_flag; // whether the alarm should ring or not.
let vol_on_flag = 0; // whether alarm is muted currently
let dd = document.getElementsByClassName("days");
let hh = document.getElementsByClassName("hours");
let mm = document.getElementsByClassName("minutes");
let ss = document.getElementsByClassName("seconds");
let namech = document.getElementsByClassName("name"); // [Arrival] - changes this
let modal_one = document.querySelector(".dialog_one"); // Allow or Deny Alarm Sounds Modal
let modal_two = document.querySelector(".dialog_two"); // New Timer Modal
let modal_three = document.querySelector(".dialog_three"); // Info Modal
let modal_four = document.querySelector(".dialog_four"); // Name Change Modal
let audio = document.getElementsByClassName("alarm")[0]; // the alarm audio
let beep = document.getElementsByClassName("beep")[0]; // the alarm audio
let vol_icon = document.getElementsByClassName("volume")[0]; // the volume icon
let mute_button = document.getElementsByClassName("mute")[0]; // the volume button
let new_button = document.querySelector(".new_cd"); // the new timer button
let info_button = document.querySelector(".info"); // the info button

// * onload function
const minutes_to_midnight = () => {
	alarm_flag = 0; // 0 means don't ring the alarm
	interval = 1000;
	audio.volume = 0.3;
	beep.volume = 0.5;
	document.documentElement.style.setProperty("--modal_one-opacity", "1");
	document.documentElement.style.setProperty("--accent-clr-main", "#0599dd");
	target_acquired(); // set the default parameters target date onload
	timekeeper(); // start the countdown
	key_binds(); // key binds to different functions
};

// * Setting the target date here. Defaulted by parameters t_*
const target_acquired = (
	t_year = 2021,
	t_month = 11,
	t_day = 2,
	t_hour = 10,
	t_min = 6,
	t_sec = 30
) => {
	let target_year = t_year;
	let target_month = t_month;
	let target_day = t_day;
	let target_hour = t_hour;
	let target_minute = t_min;
	let target_second = t_sec;
	target = new Date(
		target_year,
		target_month,
		target_day,
		target_hour,
		target_minute,
		target_second
	);
};

// * This calls the countdown function every second
const timekeeper = () => {
	clearInterval(running);
	running = setInterval(function () {
		if (alarm_flag == 0) countdown();
		else stop_countdown();
	}, interval);
};

// * This displays the countdown on screen
const countdown = () => {
	let date = Date.now();
	let ms_diff = target.getTime() - date; // ms between target and current time
	let day = Math.floor(ms_diff / 86400000); // 24 * 3600 * 1000
	let hour = Math.floor(ms_diff / 3600000 - day * 24);
	let minute = Math.floor(ms_diff / 60000 - day * 1440 - hour * 60);
	let second = Math.floor(
		ms_diff / 1000 - day * 86400 - hour * 3600 - minute * 60
	);

	if (day >= 0 && day < 10) dd[0].innerText = `0${day}`;
	else dd[0].innerText = `${day}`;
	if (hour >= 0 && hour < 10) hh[0].innerText = `0${hour}`;
	else hh[0].innerText = `${hour}`;
	if (minute >= 0 && minute < 10) mm[0].innerText = `0${minute}`;
	else mm[0].innerText = `${minute}`;
	if (second >= 0 && second < 10) ss[0].innerText = `0${second}`;
	else ss[0].innerText = `${second}`;

	// editing the after psuedoclass for unit time content
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
	if (day == 0 && hour == 0 && minute == 0 && second == 10) {
		beep.play();
		document.documentElement.style.setProperty(
			"--accent-clr-main",
			"#f11a7e"
		);
	}
	if ((day == 0 && hour == 0 && minute == 0 && second == 0) || day < 0)
		alarm_flag = 1;
};

// * Stops countdown, plays alarm, shows stop button
const stop_countdown = () => {
	clearInterval(running);
	dd[0].innerText = `00`;
	hh[0].innerText = `00`;
	mm[0].innerText = `00`;
	ss[0].innerText = `00`;
	audio.play();
	// changes opacity of certain elements when countdown is over
	{
		document.documentElement.style.setProperty("--stop-opacity", "0.15");
		document.getElementsByClassName("wrapper")[0].style.backgroundColor =
			"#05abdd25"; //#f11a7e25
	}
	document.getElementsByClassName("stop")[0].style.transform =
		"translate(-50%, -100px)";
	if (vol_on_flag == 1) {
		document.getElementsByClassName("song_name")[0].style.transform =
			"translateY(15px) scaleY(1)";
	}
	setTimeout(stop_alarm, 30000);
};

// * What happens when you press the Stop button at countdown end
const stop_alarm = () => {
	if (
		document.getElementsByClassName("stop")[0].style.transform ==
		"translate(-50%, -100px)"
	) {
		audio.pause();
		// resets all the effects
		document.documentElement.style.setProperty("--stop-opacity", "1");
		document.getElementsByClassName("wrapper")[0].style.backgroundColor =
			"transparent";
		document.getElementsByClassName("stop")[0].style.transform =
			"translate(-50%, 60px)";
		document.getElementsByClassName("song_name")[0].style.transform =
			"translateY(-40px) scaleY(0)";
	}
};

// * Allows users to create a new target date
const newtimer = (flag) => {
	let year_text_box = document.getElementById("year_input");
	let month_text_box = document.getElementById("month_input");
	let day_text_box = document.getElementById("day_input");
	let hour_text_box = document.getElementById("hour_input");
	let minute_text_box = document.getElementById("minute_input");
	let second_text_box = document.getElementById("second_input");
	if (flag == 0) {
		year_text_box.value = "";
		month_text_box.value = "";
		day_text_box.value = "";
		hour_text_box.value = "";
		minute_text_box.value = "";
		second_text_box.value = "";
		modal_two.style.transformOrigin = "top";
		modal_two.style.transform = "scaleY(1)";
		setTimeout(function () {
			document.getElementById("year_input").focus();
		}, 500);
	} else if (flag == 2) {
		modal_two.style.transform = "scaleY(0)";
		document.getElementById("year_input").blur();
	} else if (flag == 3) {
		document.querySelector(".d_two_main");
		document.querySelector(".d_two_next");
	} else {
		let blank_date = new Date();
		let user_year = parseInt(year_text_box.value);
		let user_month = parseInt(month_text_box.value);
		let user_day = parseInt(day_text_box.value);
		let user_hour = parseInt(hour_text_box.value);
		let user_minute = parseInt(minute_text_box.value);
		let user_second = parseInt(second_text_box.value);
		// if text box is not in an invalid state, do these
		if (document.querySelector(".text_box:invalid") == null) {
			modal_two.style.transform = "scaleY(0)";
			document.getElementById("year_input").blur();
			user_month--;
			if (isNaN(user_year)) user_year = blank_date.getFullYear();
			if (isNaN(user_month) && blank_date.getMonth() != 11)
				user_month = blank_date.getMonth() + 1;
			else if (isNaN(user_month) && blank_date.getMonth() == 11)
				user_month = 0;
			if (isNaN(user_day)) user_day = blank_date.getDate();
			if (isNaN(user_hour)) user_hour = blank_date.getHours();
			if (isNaN(user_minute)) user_minute = 0;
			if (isNaN(user_second)) user_second = 0;
			alarm_flag = 0; // 0 means don't ring the alarm as there's a new target
			document.documentElement.style.setProperty(
				"--accent-clr-main",
				"#0599dd"
			); // reverting the clr to blue
			target_acquired(
				user_year,
				user_month,
				user_day,
				user_hour,
				user_minute,
				user_second
			);
			timekeeper(); // restarts the countdown
		}
	}
};

// * The Modal to Allow or Deny Alarm Music
const close_modal = (flag) => {
	modal_one.style.display = "none";
	document.documentElement.style.setProperty("--modal_one-opacity", "0");
	if (flag == 1) {
		vol_on_flag = 1;
		apply_mute();
	} else {
		vol_icon.innerText = "volume_off";
		vol_on_flag = 0;
	}
};

// * The Information Modal
const info_modal = (flag) => {
	if (flag == 0) {
		modal_three.style.transformOrigin = "top";
		modal_three.style.transform = "scaleY(1)";
	} else modal_three.style.transform = "scaleY(0)";
};

// * Mute button to mute the Alarm at user choice
const mute_icon = () => {
	if (vol_icon.innerText == "volume_up") {
		vol_icon.innerText = "volume_off";
		vol_on_flag = 0;
		apply_mute();
	} else {
		vol_icon.innerText = "volume_up";
		vol_on_flag = 1;
		apply_mute();
	}
};

// * Global Muter, All muting methods go through here
const apply_mute = () => {
	if (vol_on_flag == 0) {
		audio.muted = true;
		beep.muted = true;
	} else {
		audio.muted = false;
		beep.muted = false;
	}
};

// * Allows you to change the name of the countdown
const change_name = (flag) => {
	if (flag == 0) {
		modal_four.style.transform = "translateY(30px) scaleY(1)";
		document.getElementById("cd_name_input").value = "";
		setTimeout(function () {
			document.getElementById("cd_name_input").focus();
		}, 500);
	} else if (flag == 2) {
		modal_four.style.transform = "translateY(-275px) scaleY(0)";
		document.getElementById("cd_name_input").blur();
	} else {
		let user_name = document.getElementById("cd_name_input").value;
		user_name = user_name.toUpperCase();
		// if text box is not in an invalid state, do these
		if (document.querySelector(".text_box:invalid") == null) {
			modal_four.style.transform = "translateY(-275px) scaleY(0)";
			document.getElementById("cd_name_input").blur();
			if (user_name == "" || user_name == null) user_name = "ARRIVAL";
			else namech[0].innerText = user_name;
		}
	}
};

// * Key shortcuts function
const key_binds = () => {
	Mousetrap.bind("m", function () {
		mute_button.style.webkitTextFillColor = "#adffff";
		setTimeout(function () {
			mute_button.style.webkitTextFillColor = "revert";
		}, 150);
		mute_icon();
	});
	Mousetrap.bind("n", function () {
		new_button.style.webkitTextFillColor = "#adffff";
		setTimeout(function () {
			new_button.style.webkitTextFillColor = "revert";
		}, 150);
		newtimer(0);
	});
	Mousetrap.bind("i", function () {
		info_button.style.webkitTextFillColor = "#adffff";
		setTimeout(function () {
			info_button.style.webkitTextFillColor = "revert";
		}, 150);
		info_modal(0);
	});
	Mousetrap.bind("alt+c", function () {
		namech[0].style.webkitTextFillColor = "#00ffbf";
		setTimeout(function () {
			namech[0].style.webkitTextFillColor = "revert";
		}, 150);
		change_name(0);
	});
	Mousetrap.bind(["return", "escape", "space"], function () {
		stop_alarm();
		return false;
	});
	if (
		document.documentElement.style.getPropertyValue(
			"--modal_one-opacity"
		) == 1
	) {
		Mousetrap.bind("enter", function () {
			close_modal(1);
		});
		Mousetrap.bind("esc", function () {
			close_modal(0);
		});
	}
};
