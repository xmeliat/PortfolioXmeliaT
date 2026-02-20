const jobTitle = document.getElementById('multiText');
const jobTitles = ['Diseñador Web', 'Programador', 'Diseñador Gráfico', 'Ingeniero informático'];
let index = 0;
let isDeleting = true;
let delay = 200;
let typingSpeed = 20;
let first_time = true; 

function updateJobTitle() {
  const currentTitle = jobTitle.textContent;
  let length = currentTitle.length;

  if (isDeleting) {
    jobTitle.textContent = currentTitle.substring(0, length - 1);
    length--;
  } else {
    jobTitle.textContent = jobTitles[index].substring(0, length + 1);
    length++;
  }

  if (!isDeleting && length === jobTitles[index].length) {
    isDeleting = true;
    delay = 100;
  } else if (isDeleting && length === 0) {
    isDeleting = false;
    index = (index + 1) % jobTitles.length;
    delay = 200;
  }

  setTimeout(updateJobTitle, delay);
}

if (window.screen.width > 991){
  updateJobTitle();
}else{
  jobTitle.innerHTML = 'Ingeniero, Diseñador y Programador'
}

const imageContainer = document.querySelector('.image-container');

imageContainer.addEventListener('click', () => {
  imageContainer.classList.toggle('flipped');
});

const articles = document.querySelectorAll('.article');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const indexLinks = document.querySelectorAll('.index a');
let currentIndex = 0;

function showArticle(index) {
    articles.forEach((article, i) => {
        if (i === index) {
            article.style.display = 'block';
            article.classList.add('fade-in');
            indexLinks[i].classList.add('active');
        } else {
            article.style.display = 'none';
            article.classList.remove('fade-in');
            indexLinks[i].classList.remove('active');
        }
    });
}

function showNextArticle() {
    currentIndex++;
    if (currentIndex >= articles.length) {
        currentIndex = 0;
    }
    showArticle(currentIndex);
}

function showPrevArticle() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = articles.length - 1;
    }
    showArticle(currentIndex);
}

prevButton.addEventListener('click', showPrevArticle);
nextButton.addEventListener('click', showNextArticle);

indexLinks.forEach((link, i) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = i;
        showArticle(currentIndex);
    });
});

showArticle(currentIndex);

if (window.screen.width > 992){  
  window.addEventListener('scroll', function() {
    var timelineContents = document.querySelectorAll('.timeline-content');

    for (var i = 0; i < timelineContents.length; i++) {
        var timelineContent = timelineContents[i];
        var rect = timelineContent.getBoundingClientRect();

        if (rect.top >= 0 && rect.top <= window.innerHeight) {
            timelineContent.classList.add('animate__fadeInUp');
        }
    }
  });
}

window.addEventListener('scroll', function() {
  var timelineContents = document.querySelectorAll('.skill-section');
  for (var i = 0; i < timelineContents.length; i++) {
    var timelineContent = timelineContents[i];
    var rect = timelineContent.getBoundingClientRect();

    if(!first_time){
      if (rect.top >= 0 && rect.top <= window.innerHeight) {
          timelineContent.classList.add('animate__fadeInUp');
      }
    }
        
    if(first_time){
      timelineContent.classList.remove('animate__fadeInUp');
    }
  }
  first_time = false;
});

function scrollToSection(sectionId, offset) {
  const section = document.getElementById(sectionId);
  if (section) {
    const windowHeight = window.innerHeight;
    const topOffset = section.offsetTop - (windowHeight * (offset / 100));
    window.scrollTo({ top: topOffset, behavior: 'smooth' });
  }
}
