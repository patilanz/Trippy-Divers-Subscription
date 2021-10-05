window.onload = function (){
  const $ = q => document.querySelector('#'+q);
  const startTime = new Date(2021, 10, 23);

  let days = $('days'), hours = $('hours'), minutes = $('minutes'), seconds = $('seconds');


  const changeTime = function (e, t) {
    e.className = 'moveTime';
    e.innerText = t+'';

    setTimeout(function () {
      e.className = '';
    }, 500);
  }

  setInterval(function (){
    const now = new Date();
    const dif = new Date(startTime - now);

    let tdays = dif / (1000 * 60 * 60 * 24);
    let thours = (tdays - Math.floor(tdays)) * 24
    let tminutes = (thours - Math.floor(thours)) * 60;
    let tseconds = (tminutes - Math.floor(tminutes)) * 60;

    tdays = Math.ceil(tdays);
    thours = Math.floor(thours);
    tminutes = Math.floor(tminutes);
    tseconds = Math.floor(tseconds);

    if(days.innerText !== tdays+'')changeTime(days, tdays);
    if(hours.innerText !== thours+'')changeTime(hours, thours);
    if(minutes.innerText !== tminutes+'')changeTime(minutes, tminutes);
    if(seconds.innerText !== tseconds+'')changeTime(seconds, tseconds);
  }, 1000);


}
