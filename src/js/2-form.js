document.addEventListener('DOMContentLoaded', () => {
  
const formElem = document.querySelector('.feedback-form');

let formData = {
    email: '',
    message: '',
};

const lsData = getFromLS('feedbackFromState');
  if(lsData && typeof lsData === 'object') {
    formData = lsData;
    formElem.elements.email.value = lsData.email || '';
    formElem.elements.message.value = lsData.message || '';
  }

formElem.addEventListener('input', e => {
    const email = e.currentTarget.elements.email.value;
    const message = e.currentTarget.elements.message.value;
    
    formData.email = email;
    formData.message = message;

    saveToLS('feedbackFromState', formData);
});

formElem.addEventListener('submit', e => {
    e.preventDefault();

    const emailValue = formElem.elements.email.value.trim();
    const messageValue = formElem.elements.message.value.trim();
    
    if(emailValue === '' || messageValue === '') {
      alert('Fill please all fields');
      return;
    }
    
    formData.email = emailValue;
    formData.message = messageValue;
    saveToLS('feedbackFromState', formData);
    
        
    console.dir(formData);
    localStorage.removeItem('feedbackFromState');
    formElem.reset();

    formData = {
      email: '',
      message: '',
    };
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}

});