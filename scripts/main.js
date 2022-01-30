//! Attribution Roshin Nishad 2021 Nov | GetPsyched6 © | MIT License
let target; // the target date it count downs to.
let running; // the setInterval variable
let alarm_flag; // whether the alarm should ring or not.
let vol_on_flag = 0; // whether alarm is muted currently
let mute_icon_clicked = 0; // to know if mute button was clicked
let beep = document.querySelector(".beep"); // the alarm warning beep
let dd = document.querySelector(".days");
let hh = document.querySelector(".hours");
let mm = document.querySelector(".minutes");
let ss = document.querySelector(".seconds");

// * onload function
const minutes_to_midnight = () => {
	let audio = document.querySelector(".alarm");
	alarm_flag = 0; // 0 means don't ring the alarm
	audio.volume = 0.3;
	beep.volume = 0.5;
	localstore(); // getting user's preference
	timekeeper(); // start the countdown
	key_binds(); // key binds to different functions
};

// * get localstorage function
const localstore = () => {
	let no_of_visits = 1;
	let namech = document.querySelector(".name");
	if (localStorage.getItem("visited") == null) {
		localStorage.setItem("visited", no_of_visits);
		document.documentElement.style.setProperty("--modal_one-opacity", "1");
	} else {
		no_of_visits += parseInt(localStorage.getItem("visited"));
		localStorage.setItem("visited", no_of_visits);
		if (no_of_visits % 5 == 0)
			document.documentElement.style.setProperty(
				"--modal_one-opacity",
				"1"
			);
		else close_modal();
	}
	if (localStorage.getItem("new_year") != null) {
		tar_year = parseInt(localStorage.getItem("new_year"));
		tar_month = parseInt(localStorage.getItem("new_month"));
		tar_day = parseInt(localStorage.getItem("new_day"));
		tar_hour = parseInt(localStorage.getItem("new_hour"));
		tar_min = parseInt(localStorage.getItem("new_minute"));
		tar_sec = parseInt(localStorage.getItem("new_second"));
		target_acquired(
			// set the default parameters target date
			tar_year,
			tar_month,
			tar_day,
			tar_hour,
			tar_min,
			tar_sec
		);
	} else target_acquired();
	if (localStorage.getItem("name") != null)
		namech.innerText = localStorage.getItem("name");
};

// * Setting the target date here. Defaulted by parameters t_*
const target_acquired = (
	t_year = 2022,
	t_month = 5,
	t_day = 18,
	t_hour = 0,
	t_min = 0,
	t_sec = 0
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
	}, 1000);
};

// * This displays the countdown on screen
const countdown = () => {
	let visit = localStorage.getItem("visited");
	let sec_mute = document.querySelector(".secondary_mute");
	let date = Date.now();
	let ms_diff = target.getTime() - date; // ms between target and current time
	let day = Math.floor(ms_diff / 86400000); // 24 * 3600 * 1000
	let hour = Math.floor(ms_diff / 3600000 - day * 24);
	let minute = Math.floor(ms_diff / 60000 - day * 1440 - hour * 60);
	let second = Math.floor(
		ms_diff / 1000 - day * 86400 - hour * 3600 - minute * 60
	);

	if (day >= 0 && day < 10) dd.innerText = `0${day}`;
	else dd.innerText = `${day}`;
	if (hour >= 0 && hour < 10) hh.innerText = `0${hour}`;
	else hh.innerText = `${hour}`;
	if (minute >= 0 && minute < 10) mm.innerText = `0${minute}`;
	else mm.innerText = `${minute}`;
	if (second >= 0 && second < 10) ss.innerText = `0${second}`;
	else ss.innerText = `${second}`;

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
	if (visit != 1 && visit % 5 != 0 && mute_icon_clicked == 0) {
		sec_mute.style.borderWidth = "3px";
		if (second % 2 == 0) {
			sec_mute.style.borderColor = "#00ffff";
		} else sec_mute.style.borderColor = "revert";
	} else if (mute_icon_clicked == 1) {
		sec_mute.style.borderColor = "revert";
		sec_mute.style.borderWidth = "2px";
		mute_icon_clicked = 2;
	}
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
	let audio = document.querySelector(".alarm");
	clearInterval(running);
	dd.innerText = `00`;
	hh.innerText = `00`;
	mm.innerText = `00`;
	ss.innerText = `00`;
	audio.play();
	// changes opacity of certain elements when countdown is over
	{
		document.documentElement.style.setProperty("--stop-opacity", "0.15");
		document.querySelector(".wrapper").style.backgroundColor = "#05abad25"; //#f11a7e25
	}
	document.querySelector(".stop").style.transform = "translate(-50%, -100px)";
	if (vol_on_flag == 1) {
		document.querySelector(".song_name").style.transform =
			"translateY(15px) scaleY(1)";
	}
	setTimeout(stop_alarm, 30000);
};

// * What happens when you press the Stop button at countdown end
const stop_alarm = () => {
	let audio = document.querySelector(".alarm");
	let stop_button = document.querySelector(".stop");
	if (stop_button.style.transform == "translate(-50%, -100px)") {
		audio.pause();
		// resets all the effects
		document.documentElement.style.setProperty("--stop-opacity", "1");
		document.querySelector(".wrapper").style.backgroundColor =
			"transparent";
		stop_button.style.transform = "translate(-50%, 60px)";
		document.querySelector(".song_name").style.transform =
			"translateY(-40px) scaleY(0)";
	}
};

// * Allows users to create a new target date
const newtimer = (flag) => {
	let year_text_box = document.querySelector("#year_input");
	let month_text_box = document.querySelector("#month_input");
	let day_text_box = document.querySelector("#day_input");
	let hour_text_box = document.querySelector("#hour_input");
	let minute_text_box = document.querySelector("#minute_input");
	let second_text_box = document.querySelector("#second_input");
	let modal_two = document.querySelector(".dialog_two");
	let dialog_two_main = document.querySelector(".d_two_main");
	let dialog_two_next = document.querySelector(".d_two_next");
	let btn_next = document.querySelector("#btn_next");

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
			year_text_box.focus();
		}, 400);
	} else if (flag == 2) {
		modal_two.style.transform = "scaleY(0)";
		year_text_box.blur();
	} else if (flag == 3) {
		if (document.querySelector(".d2_main_box:invalid") == null) {
			dialog_two_main.style.transform = "translateX(-32.5rem)";
			btn_next.type = "button";
			setTimeout(function () {
				dialog_two_main.style.display = "none";
				dialog_two_next.style.display = "block";
			}, 150);

			setTimeout(function () {
				dialog_two_next.style.transform = "translateX(0rem)";
			}, 175);
			setTimeout(function () {
				hour_text_box.focus();
			}, 500);
		}
	} else if (flag == 4) {
		dialog_two_next.style.transform = "translateX(32.5rem)";
		btn_next.type = "submit";
		setTimeout(function () {
			dialog_two_next.style.display = "none";
			dialog_two_main.style.display = "block";
		}, 150);

		setTimeout(function () {
			dialog_two_main.style.transform = "translateX(0rem)";
		}, 175);
		setTimeout(function () {
			year_text_box.focus();
		}, 500);
	} else {
		let blank_date = new Date();
		let user_year = parseInt(year_text_box.value);
		let user_month = parseInt(month_text_box.value);
		let user_day = parseInt(day_text_box.value);
		let user_hour = parseInt(hour_text_box.value);
		let user_minute = parseInt(minute_text_box.value);
		let user_second = parseInt(second_text_box.value);
		// if text box is not in an invalid state, do these
		if (document.querySelector(".d2_box:invalid") == null) {
			modal_two.style.transform = "scaleY(0)";
			dialog_two_next.style.transform = "translateX(32.5rem)";
			btn_next.type = "submit";
			dialog_two_next.style.display = "none";
			dialog_two_main.style.display = "block";
			dialog_two_main.style.transform = "translateX(0rem)";
			year_text_box.blur();
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
			localStorage.setItem("new_year", user_year);
			localStorage.setItem("new_month", user_month);
			localStorage.setItem("new_day", user_day);
			localStorage.setItem("new_hour", user_hour);
			localStorage.setItem("new_minute", user_minute);
			localStorage.setItem("new_second", user_second);
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

// * The Opening Modal to Allow or Deny Alarm Music
const close_modal = (flag) => {
	let vol_icon = document.querySelector(".volume");
	let modal_one = document.querySelector(".dialog_one");
	document.documentElement.style.setProperty("--modal_one-opacity", "0");
	setTimeout(function () {
		modal_one.style.display = "none";
	}, 500);
	if (flag == 1) {
		vol_on_flag = 1;
		apply_mute();
	} else {
		vol_icon.innerText = "volume_off";
		vol_on_flag = 0;
		apply_mute();
	}
};

// * The Information Modal
const info_modal = (flag) => {
	let modal_three = document.querySelector(".dialog_three");
	if (flag == 0) {
		modal_three.style.transformOrigin = "top";
		modal_three.style.transform = "scaleY(1)";
	} else modal_three.style.transform = "scaleY(0)";
};

// * Mute button to mute the Alarm at user's choice
const mute_icon = () => {
	mute_icon_clicked = 1;
	let vol_icon = document.querySelector(".volume");
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
	let audio = document.querySelector(".alarm");
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
	let modal_four = document.querySelector(".dialog_four");
	let namech = document.querySelector(".name");
	let name_text_box = document.querySelector("#cd_name_input");
	if (flag == 0) {
		modal_four.style.transform = "translateY(30px) scaleY(1)";
		name_text_box.value = "";
		setTimeout(function () {
			name_text_box.focus();
		}, 400);
	} else if (flag == 2) {
		modal_four.style.transform = "translateY(-275px) scaleY(0)";
		name_text_box.blur();
	} else {
		let user_name = name_text_box.value;
		user_name = user_name.toUpperCase();
		// if text box is not in an invalid state, do these
		if (document.querySelector(".d4_box:invalid") == null) {
			modal_four.style.transform = "translateY(-275px) scaleY(0)";
			name_text_box.blur();
			if (user_name != "" && user_name != null) {
				namech.innerText = user_name;
				localStorage.setItem("name", user_name);
			}
		}
	}
};

// * Key shortcuts function
const key_binds = () => {
	let mute_button = document.querySelector(".mute");
	let new_button = document.querySelector(".new_cd");
	let info_button = document.querySelector(".info");
	let namech = document.querySelector(".name");
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
		namech.style.webkitTextFillColor = "#00ffbf";
		setTimeout(function () {
			namech.style.webkitTextFillColor = "revert";
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
