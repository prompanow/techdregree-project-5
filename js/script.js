$(document).ready(function () {

  // This function will create every profile on the page
  function profileBlock (data) {
    const pageHeader = document.querySelector('.page-header');
    const ul = document.createElement('ul');
    ul.className = 'employee-list';
    pageHeader.insertAdjacentElement('afterend', ul);

    // This for-loop creates every profile with the correct data
    for (let i = 0; i < data.results.length; i += 1) {

      // Creating the profile HTML elements that will show on the page
      const a = document.createElement('a');
      const li = document.createElement('li');
      const div1 = document.createElement('div');
      const img = document.createElement('img');
      const div2 = document.createElement('div');
      const h3 = document.createElement('h3');
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');

      // Adding attributes with different values
      a.href = '#';
      a.className = 'myBtn';
      li.className = 'employee-item';
      div1.className = 'employee-img',
      img.src = data.results[i].picture.large;
      div2.className = 'employee-info';

      h3.textContent = data.results[i].name.first.charAt(0).toUpperCase() +
      data.results[i].name.first.slice(1) + ' ';

      h3.textContent += data.results[i].name.last.charAt(0).toUpperCase() +
      data.results[i].name.last.slice(1);

      span1.textContent = data.results[i].email;
      span1.className = 'spanText';
      span2.textContent = data.results[i].nat;

      // Inserting the HTML elements onto the index-page
      ul.insertAdjacentElement('beforeend', a);
      a.insertAdjacentElement('beforeend', li);
      li.insertAdjacentElement('beforeend', div1);
      div1.insertAdjacentElement('beforeend', img);
      li.insertAdjacentElement('beforeend', div2);
      div2.insertAdjacentElement('beforeend', h3);
      div2.insertAdjacentElement('beforeend', span1);
      div2.insertAdjacentElement('beforeend', span2);
    };
  }

  // This function will create the modal box and the click functionality on the page
  function modalBlock (data) {
    const btn = document.querySelectorAll(".myBtn"); // Get the button that opens the modal
    const body = document.querySelector('body'); // Get the document body tag

    // Creating the modal HTML elements that will show on the page
    const divModal = document.createElement('div');
    const divModalContent = document.createElement('div');
    const spanClose = document.createElement('span');
    const divModalImg = document.createElement('div');
    const imgModal = document.createElement('img');
    const divModalInfo = document.createElement('div');
    const h3Modal = document.createElement('h3');
    const spanMail = document.createElement('span');
    const spanCountry = document.createElement('span');
    const hr = document.createElement('hr');
    const spanNumber = document.createElement('span');
    const spanAddress = document.createElement('span');
    const spanBirthday = document.createElement('span');

    // Adding attributes with different values
    divModal.id = 'myModal';
    divModal.className = 'modal';
    divModalContent.className = 'modal-content';
    spanClose.className = 'close';
    spanClose.innerHTML = '&times;';
    divModalImg.className = 'modal-img';
    divModalInfo.className = 'modal-info';
    spanBirthday.className = 'spanBirthdayText'

    // Adding attributes with specific values, get from API
    // The function takes a number to determine what user data shall be visible
    function listener (index) {

      imgModal.src = data.results[index].picture.large;

      h3Modal.textContent = data.results[index].name.first.charAt(0).toUpperCase() +
      data.results[index].name.first.slice(1) + ' ';

      h3Modal.textContent += data.results[index].name.last.charAt(0).toUpperCase() +
      data.results[index].name.last.slice(1);

      spanMail.textContent = data.results[index].email;
      spanCountry.textContent = data.results[index].nat;
      spanNumber.textContent = data.results[index].phone;
      spanAddress.textContent = data.results[index].location.street;
      spanBirthday.textContent = data.results[index].dob;
    };

    // Inserting the HTML elements onto the index-page
    body.insertAdjacentElement('afterbegin', divModal);
    divModal.insertAdjacentElement('beforeend', divModalContent);
    divModalContent.insertAdjacentElement('beforeend', spanClose);
    divModalContent.insertAdjacentElement('beforeend', divModalImg);
    divModalImg.insertAdjacentElement('beforeend', imgModal);
    divModalContent.insertAdjacentElement('beforeend', divModalInfo);
    divModalInfo.insertAdjacentElement('beforeend', h3Modal);
    divModalInfo.insertAdjacentElement('beforeend', spanMail);
    divModalInfo.insertAdjacentElement('beforeend', spanCountry);
    divModalInfo.insertAdjacentElement('beforeend', hr);
    divModalInfo.insertAdjacentElement('beforeend', spanNumber);
    divModalInfo.insertAdjacentElement('beforeend', spanAddress);
    divModalInfo.insertAdjacentElement('beforeend', spanBirthday);

    // When the user clicks on the button, open the modal
    // The for-loop enables the possibility to get correct profile-data when clicking
    for (let i = 0; i < data.results.length; i += 1) {
      btn[i].onclick = function() {
          divModal.style.display = "block";
      };

      // This supply the listener-function with an index-value
      btn[i].addEventListener('click', listener.bind( null, i));
    };

    // When the user clicks on <span> (x), close the modal
    spanClose.onclick = function() {
        divModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == divModal) {
            divModal.style.display = "none";
        }
    }
  }

  // AJAX, get the random-user data from API
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&inc=picture,name,location,email,phone,nat,dob',
    dataType: 'json',
    success: function(data) {
      
      profileBlock(data);
      modalBlock(data);

    }
  });
});
