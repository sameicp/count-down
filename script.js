'use strict';

const h1 = document.querySelector('h1');
const card = document.querySelector('.card');
h1.textContent = '';

class Timer {
  constructor(countdownInSeconds) {
    this._countDown = countdownInSeconds;
  }

  getDaysLeft() {
    return String(Math.trunc(this.#calcHours() / 24)).padStart(2, 0);
  }

  getHoursLeft() {
    return String(this.#calcHours() % 24).padStart(2, 0);
  }

  getMinutesLeft() {
    return String(this.#calcMinutes() % 60).padStart(2, 0);
  }

  getSecondsLeft() {
    return String(this._countDown % 60).padStart(2, 0);
  }

  hasElapsed() {
    return this._countDown < 0;
  }

  _tick() {
    return this._countDown--;
  }

  #calcHours() {
    return Math.trunc(this.#calcMinutes() / 60);
  }

  #calcMinutes() {
    return Math.trunc(this._countDown / 60);
  }
}

class BirthDateCountDown extends Timer {
  #name;
  #birthDate;
  #birthYear;

  constructor(secondsLeft, birthDate, name) {
    super(secondsLeft);
    this.#setVariables(name, birthDate);
    this._tick();
  }

  #setVariables(name, birthDate) {
    this.#birthDate = birthDate;
    this.#birthYear = this.#birthDate.getFullYear();
    this.#birthDate.setFullYear(new Date().getFullYear());
    this.#name = String(name).toUpperCase();
  }

  getAge() {
    return this.#birthDate.getFullYear() - this.#birthYear;
  }

  getFormatedTimeStamp() {
    this._tick();
    return `${this.getDaysLeft()}:${this.getHoursLeft()}:${this.getMinutesLeft()}:${this.getSecondsLeft()}`;
  }

  getMessage(addAge = true) {
    return `🎉🎊 HAPPY 🎈 BIRTHDAY 🎈 ${this.#name}${
      addAge ? ' @ ' + this.getAge() : ''
    } 🎇🎆`;
  }
}

class PictureCountDown extends Timer {
  constructor(countdown) {
    super(countdown);
  }

  getFormatedCountDown() {
    this._tick();
    return `<span>${
      this.getHoursLeft() === '23' ? '➋➌' : this.getHoursLeft()
    }</span>:<span>${
      this.getMinutesLeft() === '23' ? '➋➌' : this.getMinutesLeft()
    }</span>:<span>${
      this.getSecondsLeft() === '23' ? '➋➌' : this.getSecondsLeft()
    }</span>`;
  }
}

class Settings {
  constructor(name, ...birthDate) {
    this._name = name;
    this._birthDate = new Date(...birthDate);
    this._dateOfBirth = new Date(...birthDate);
    this._birthDate.setFullYear(new Date().getFullYear());
    this._birthDateTimeStamp = this._birthDate.getTime();
  }

  getName() {
    return this._name;
  }

  getBirthDate() {
    return this._dateOfBirth;
  }

  getTimeOut() {
    return 24 * 60 * 60;
  }

  getSeconds() {
    return Math.trunc((this._birthDateTimeStamp - Date.now()) / 1000);
  }

  getHtml() {
    return `
    <div class="card">
      <img src="./img/samuel.jpeg" alt="same1" class="avatar" />
      <p></p>
    </div>`;
  }
}

let countdown;
const variableSetting = new Settings('Same', 2001, 1, 9);
const timeoutpicture = new PictureCountDown(variableSetting.getTimeOut());
const sameBirthDate = new BirthDateCountDown(
  variableSetting.getSeconds(),
  variableSetting.getBirthDate(),
  variableSetting.getName()
);

const tick2 = () => {
  const formatedTimeout = timeoutpicture.getFormatedCountDown();
  document.querySelector(
    'p'
  ).innerHTML = `Picture will fade-out in ${formatedTimeout}`;
  if (timeoutpicture.hasElapsed()) {
    clearInterval(countdown);
    document.querySelector('p').textContent = '';
    document.body.style.opacity = '0%';
  }
};

const tick = () => {
  h1.textContent = sameBirthDate.getFormatedTimeStamp();
  if (sameBirthDate.hasElapsed()) {
    clearInterval(birthDateCountDown);
    h1.insertAdjacentHTML('afterend', variableSetting.getHtml());
    document.body.style.display = 'grid';
    h1.textContent = sameBirthDate.getMessage();
    tick2();
    countdown = setInterval(tick2, 1000);
  }
};
const birthDateCountDown = setInterval(tick, 1000);
