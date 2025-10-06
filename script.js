//elements

const indicator = document.getElementById('indicator');
const tab1 = document.getElementById('c');
const tab2 = document.getElementById('s');
const step1Element = document.getElementById('step1');
const step2Element = document.getElementById('step2');
const step3Element = document.getElementById('step3');
const selectedHourElement = document.getElementById('selectedHour');
const selectedMinuteElement = document.getElementById('selectedMinute');
const selectedDayElement = document.getElementById('selectedDay');
const selectedMonthElement = document.getElementById('selectedMonth');
const selectedYearElement = document.getElementById('selectedYear');
const dayList = document.getElementById('dayList');
const monthList = document.getElementById('mothList');
const yearList = document.getElementById('yearList');

//variables
var currenDate = new Date();
let currentiIndex = 0;
let selectedHourValue = currenDate.getHours();
let selectedMinuteValue = currenDate.getMinutes();
let selectedDayValue = currenDate.getDate().toString().padStart(2,'0');
let selectedMonthValue = (currenDate.getMonth() + 1).toString().padStart(2, '0');
let selectedYearValue = currenDate.getFullYear().toString();
let days =[];
let months =[];
let years =[];

selectedHourElement.textContent = selectedHourValue;
selectedMinuteElement.textContent = selectedMinuteValue;

// Saat listesi
for(let h = 0; h < 24; h++){
    const li = document.createElement('li');
    li.textContent = h.toString().padStart(2,'0');
    hourList.style.listStyleType = 'none';
    li.style.padding = '1rem 0'
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
        if (!checkDateTime(parseInt(selectedYearValue), parseInt(selectedMonthValue), parseInt(selectedDayValue), h, selectedMinuteValue)) return;
        selectedHourValue = h;
        selectedHourElement.textContent = h.toString().padStart(2,'0');
    });
    hourList.appendChild(li);
}

// Dakika listesi
for(let m = 0; m < 60; m++){
    const li = document.createElement('li');
    li.textContent = m.toString().padStart(2,'0');
      minuteList.style.listStyleType = 'none';
    li.style.padding = '1rem 0'
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
        if (!checkDateTime(parseInt(selectedYearValue), parseInt(selectedMonthValue), parseInt(selectedDayValue), m, selectedMinuteValue)) return;
        selectedMinuteValue = m;
        selectedMinuteElement.textContent = m.toString().padStart(2,'0');
    });
    minuteList.appendChild(li);
}


for(let y = 2025; y< 2126; y++){
     years.push(y);
}

for (let m = 1; m < 13; m++) {
    months.push(m.toString().padStart(2,'0'));
}

//dinamik günler

function getDaysInMonth(year, month) {

    return new Date(year, month, 0).getDate();
}

function dynamicDays(year, month){
     dayList.innerHTML ='';
     let dayInMonth = getDaysInMonth(year, month);
     for(let d = 1;d <= dayInMonth; d++){
          const dayListItem = document.createElement('li');
          dayList.style.listStyleType = 'none'
          dayListItem.style.padding = '1rem 0'
          dayListItem.style.cursor ='pointer'
          dayListItem.textContent = d.toString().padStart(2,'0');

           dayListItem.addEventListener('click', () => {
            selectedDayValue = d.toString().padStart(2,'0');
            selectedDay.textContent = selectedDayValue;
        });
        dayList.appendChild(dayListItem);
     }
}

dynamicDays(parseInt(selectedYearValue), parseInt(selectedMonthValue));


function updateDays() {
  dynamicDays(parseInt(selectedYearValue), parseInt(selectedMonthValue));
}



selectedYearElement.textContent = selectedYearValue;
selectedMonth.textContent = selectedMonthValue;
selectedDay.textContent = selectedDayValue;

//list

years.forEach((year, index) => {
  const yearListItem = document.createElement('li');
  yearList.style.listStyleType ='none'
  yearListItem.style.padding = '1rem 0'
  yearListItem.style.cursor ='pointer'
  yearListItem.textContent = `${year}`;
  yearListItem.addEventListener('click', (e)=>{
     selectedYearValue = year;
     selectedYearElement.textContent = `${year}`;
     updateDays();
  })
  yearList.appendChild(yearListItem);
});


months.forEach((month, index) =>{
     const monthListItem = document.createElement('li');
     monthList.style.listStyleType = 'none'
     monthListItem.style.padding = '1rem 0'
     monthListItem.style.cursor ='pointer'
     monthListItem.textContent = `${month}`;
     monthListItem.addEventListener('click', (e)=>{
     selectedMonthValue = month;
     selectedMonthElement.textContent = `${month}`;
     updateDays();
     })
      monthList.appendChild(monthListItem);

})

const cSection = document.getElementById('countdown');
const sSection = document.getElementById('stopwatch');

tab1.addEventListener('click', (e)=>{
     if(currentiIndex !== 0){
          indicator.style.transform = 'translateX(0%)';
          tab2.style.opacity = 0.4;
          tab1.style.opacity = 1;
          cSection.style.opacity = 1;
          cSection.style.transform = 'scale(1)';
          sSection.style.opacity = 0.0;
          sSection.style.transform = 'scale(0.6)';
          sSection.style.filter = 'blur(2rem)';
          cSection.style.filter = 'blur(0rem)';
          currentiIndex = 0;
     }
});

tab2.addEventListener('click', (e)=>{
     if(currentiIndex !== 1){
          indicator.style.transform = 'translateX(100%)';
          tab2.style.opacity = 1;
          tab1.style.opacity = 0.4;
          sSection.style.opacity = 1;
          sSection.style.transform = 'scale(1)';
          cSection.style.opacity = 0.0;
          cSection.style.transform = 'scale(0.6)';
           cSection.style.filter = 'blur(2rem)';
          sSection.style.filter = 'blur(0rem)';
          currentiIndex = 1;
     }
});


//functions

function checkDateTime(year, month, day, hour, minute) {
    const selectedDateTime = new Date(year, month - 1, day, hour, minute);
    const now = new Date();

    if (selectedDateTime < now) {
        alert('Seçilen tarih ve saat bugünden geride olamaz!');
        return false;
    }
    return true;
}


let currentStep = 1;
const nextbutton = document.getElementById('f-next');

    nextbutton.addEventListener('click', (e) => {
    e.preventDefault();

    if (currentStep === 1) {
        const selectedDate = new Date(selectedYearValue, selectedMonthValue - 1, selectedDayValue);
        const now = new Date();

        if (selectedDate < now) {
            alert('Seçilen tarih bugünden geride olamaz!');
            return;
        }

        // Step 1 → Step 2 geçiş animasyonu
        step1Element.style.filter = 'blur(2rem)';
        step1Element.style.opacity = 0;
        step1Element.style.transform = 'scale(0)';
        step1Element.style.width ='0px';
        step1Element.style.visibility = 'hidden';
        step2Element.style.visibility = 'visible';
        step2Element.style.width = 'max-content';
        step2Element.style.filter = 'blur(0rem)';
        step2Element.style.opacity = 1;
        step2Element.style.transform = 'scale(1)';
        document.getElementById('f-next').textContent = 'Hesapla';

        currentStep = 2;
    }
    else if (currentStep === 2) {
        const now = new Date();
        const selectedDateTime = new Date(selectedYearValue, selectedMonthValue - 1, selectedDayValue, selectedHourValue, selectedMinuteValue);

        if (selectedDateTime < now) {
            alert('Seçilen tarih ve saat bugünden geride olamaz!');
            return;
        }

         step2Element.style.filter = 'blur(2rem)';
        step2Element.style.opacity = 0;
        step2Element.style.transform = 'scale(0)';
        step2Element.style.width ='0px';
        step2Element.style.visibility = 'hidden';
        step3Element.style.visibility = 'visible';
        step3Element.style.width = 'max-content';
        step3Element.style.filter = 'blur(0rem)';
        step3Element.style.opacity = 1;
        step3Element.style.transform = 'scale(1)';

        document.getElementById('countdown').style.top = '30%'

        document.getElementById('buttons').style.bottom = '-370%';
        document.getElementById('f-next').textContent = 'Sonlandır';
        currentStep = 3;

          // Step 3
          const updateCountdown = () => {
          const now = new Date();
          const selected = new Date(selectedYearValue, selectedMonthValue - 1, selectedDayValue, selectedHourValue, selectedMinuteValue);
          let diff = selected - now;

          if (diff <= 0) {
               console.log("Tarih geldi!");
               clearInterval(intervalId);
               return;
          }

         
          let asDays = document.getElementById('asDays');
          let asHours = document.getElementById('asHours');
          let asMinutes = document.getElementById('asMinutes');
          let asSeconds = document.getElementById('asSeconds');

          
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          document.getElementById('countdownDays').textContent = days;
          document.getElementById('countdownHours').textContent = hours;
          document.getElementById('countdownMinutes').textContent = minutes;
          document.getElementById('countdownSeconds').textContent = seconds;

          
          const totalDays = diff / (1000 * 60 * 60 * 24);
          const totalHours = diff / (1000 * 60 * 60);
          const totalMinutes = diff / (1000 * 60);
          const totalSeconds = diff / 1000;

          
          asDays.textContent = Math.floor(totalDays);
          asHours.textContent = Math.floor(totalHours);
          asMinutes.textContent = Math.floor(totalMinutes);
          asSeconds.textContent = Math.floor(totalSeconds);

          console.log(`Kalan: ${days} gün ${hours} saat ${minutes} dk ${seconds} sn`);
          };

          const intervalId = setInterval(updateCountdown, 1000);
          }
});
