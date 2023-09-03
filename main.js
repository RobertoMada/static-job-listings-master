let obj;
let filterArr = [];
let jobFiltered;
const filterContainer = document.querySelector('.filter-container');
const clear = document.querySelector('.clear');
clear.addEventListener('click', resetFilters);

async function populate() {
    const requestURL =
      "https://raw.githubusercontent.com/RobertoMada/static-job-listings-master/main/data.json";
  
    const response = await fetch(requestURL);
    obj = await response.json();
    displayJobs(obj);
  }

  function displayJobs(jobs){
    const main = document.getElementsByTagName('main')[0];

    for(const job of jobs){
      const flexBox = document.createElement('div');
      flexBox.classList.add('flex-box');
      flexBox.classList.add('slide-in-left');
      main.appendChild(flexBox);
      const jobContainer = document.createElement('div');
      jobContainer.classList.add('job-container');
      flexBox.appendChild(jobContainer);
      const tabletContainer = document.createElement('div');
      tabletContainer.classList.add('tablet-container');
      flexBox.appendChild(tabletContainer);
      const imageContainer = document.createElement('div');
      const img = document.createElement('img');
      img.setAttribute('src', job.logo);
      jobContainer.appendChild(imageContainer);
      imageContainer.appendChild(img);
      const gridBox = document.createElement('div');
      gridBox.classList.add('grid-box');
      jobContainer.appendChild(gridBox);
      const company = document.createElement('p');
      company.classList.add('company');
      company.textContent = job.company;
      gridBox.appendChild(company);
      if(job.new){
        const newJob = document.createElement('span');
        newJob.classList.add('new');
        newJob.textContent = 'NEW!';
        company.appendChild(newJob);
      }

      if(job.featured){
        const featured = document.createElement('span');
        featured.classList.add('featured');
        featured.textContent = 'FEATURED';
        company.appendChild(featured);
        flexBox.classList.add('left-border');
      }

      const position = document.createElement('p');
      position.classList.add('position');
      position.textContent = job.position;
      gridBox.appendChild(position);
      const details = document.createElement('p');
      details.textContent = `${job.postedAt}  \u00B7  ${job.contract}  \u00B7  ${job.location}`;
      gridBox.appendChild(details);

      const roleTablet = document.createElement('button');
      roleTablet.classList.add('filter-tablet');
      roleTablet.textContent = job.role;
      tabletContainer.appendChild(roleTablet);

      const levelTablet = document.createElement('button');
      levelTablet.classList.add('filter-tablet');
      levelTablet.textContent = job.level;
      tabletContainer.appendChild(levelTablet);
      
      const language = job.languages;
      const tool = job.tools;

      for(const lang of language){
      const filterTablet = document.createElement('button');
      filterTablet.classList.add('filter-tablet');
      filterTablet.textContent = lang;
      tabletContainer.appendChild(filterTablet);
      }

      for(const t of tool){
        const filterTablet = document.createElement('button');
        filterTablet.classList.add('filter-tablet');
        filterTablet.textContent = t;
        tabletContainer.appendChild(filterTablet);
        }
    }

    addEventToFilter();

  }

  populate();

function addEventToFilter(){
    const selectFilter = document.querySelectorAll('.filter-tablet');
  selectFilter.forEach((filter) => {
  filter.addEventListener('click', addFilter)
});
};

function addFilter(e){
  let text = e.target.textContent;
  if(!filterArr.includes(text)){
    filterArr.push(text);
    displayFilter(text);
    recursiveFilter();
    resetDisplay();
    displayJobs(jobFiltered);
  }
  if(filterArr.length >= 1){
    filterContainer.classList.remove('hidden');
  }
}

function displayFilter(filter){
  const buton = document.createElement('button');
  buton.textContent = filter;
  buton.classList.add('filter')
  filterContainer.firstElementChild.appendChild(buton);
  buton.addEventListener('click', removeFilter);
}

function resetFilters(){
  filterArr = [];
  filterContainer.classList.add('hidden');
  while(filterContainer.firstElementChild.hasChildNodes()){
    filterContainer.firstElementChild.removeChild(filterContainer.firstElementChild.firstChild);
  }
  resetDisplay();
  displayJobs(obj);
}

function removeFilter(e){
  e.target.remove();
  filterArr = filterArr.filter((word) => word !== e.target.textContent);
  if(filterArr.length === 0){
    filterContainer.classList.add('hidden');
  }
  recursiveFilter();
  resetDisplay();
  displayJobs(jobFiltered);
}

function recursiveFilter(){
  jobFiltered = Array.from(obj);
  for(let i = 0; i < filterArr.length; i++){
    jobFiltered = jobFiltered.filter((job) => {
      if(job.role === filterArr[i] || job.level === filterArr[i] ){
        return true;
      }
      for(const lang of job.languages){
        if(lang === filterArr[i]){
          return true;
        }
      }
      for(const tool of job.tools){
        if(tool === filterArr[i]){
          return true;
        }
      }
    });
  }
}


function resetDisplay(){
  const flexBox = document.querySelectorAll('.flex-box');
  for(const element of flexBox){
    element.remove();
  }
}