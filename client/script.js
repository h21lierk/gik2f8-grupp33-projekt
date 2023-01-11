/* hej */
friendForm.friendName.addEventListener('keyup', (e) => validateField(e.target));
friendForm.friendName.addEventListener('blur', (e) => validateField(e.target));

friendForm.birthday.addEventListener('input', (e) => validateField(e.target));
friendForm.birthday.addEventListener('blur', (e) => validateField(e.target));

friendForm.interests.addEventListener('input', (e) => validateField(e.target));
friendForm.interests.addEventListener('blur', (e) => validateField(e.target));

friendForm.favoriteColor.addEventListener('input', (e) => validateField(e.target));
friendForm.favoriteColor.addEventListener('blur', (e) => validateField(e.target));

friendForm.favoriteAnimal.addEventListener('input', (e) => validateField(e.target));
friendForm.favoriteAnimal.addEventListener('blur', (e) => validateField(e.target));

friendForm.dreamJob.addEventListener('input', (e) => validateField(e.target));
friendForm.dreamJob.addEventListener('blur', (e) => validateField(e.target));


friendForm.addEventListener('submit', onSubmit);

const friendListElement = document.getElementById('friendList');

/* validering - ser till att fälterna är ifyllde korrekt */
let friendNameValid = true;
let birthdayValid = true;
let interestsValid = true;
let favoriteColorValid = true;
let favoriteAnimalValid = true;
let dreamJobValid = true;




const api = new Api('http://localhost:5000/friends');


function validateField(field) {
  const { name, value } = field;

  let = validationMessage = '';
  switch (name) {
    case 'friendName': {
      if (value.length < 1) {
        friendNameValid = false;
        validationMessage = "Fältet 'Namn' måste innehålla minst 1 tecken.";
      } else if (value.length > 100) {
        friendNameValid = false;
        validationMessage =
          "Fältet 'Namn' får inte innehålla mer än 100 tecken.";
      } else {
        friendNameValid = true;
      }
      break;
    }

    case 'birthday': {
      if (value.length === 0) {
        birthdayValid = false;
        validationMessage = "Fältet 'Födelsedag' är obligatorisk.";
      } else {
        birthdayValid = true;
      }
      break;
    }

    case 'interests': {
      if (value.length < 1) {
        interestsValid = false;
        validationMessage = "Fältet 'Intressen' måste innehålla minst 1 tecken.";
      } else if (value.length > 100) {
        interestsValid = false;
        validationMessage =
          "Fältet 'Intressen' får inte innehålla mer än 100 tecken.";
      } else {
        interestsValid = true;
      }
      break;
    }

    case 'favoriteColor': {
      if (value.length < 1) {
        favoriteColorValid = false;
        validationMessage = "Fältet 'Favoritfärg' måste innehålla minst 1 tecken.";
      } else if (value.length > 100) {
        favoriteColorValid = false;
        validationMessage =
          "Fältet 'Favoritfärg' får inte innehålla mer än 100 tecken.";
      } else {
        favoriteColorValid = true;
      }
      break;
    }

    case 'favoriteAnimal': {
      if (value.length < 1) {
        favoriteAnimalValid = false;
        validationMessage = "Fältet 'Favoritdjur' måste innehålla minst 1 tecken.";
      } else if (value.length > 100) {
        favoriteAnimalValid = false;
        validationMessage =
          "Fältet 'Favoritdjur' får inte innehålla mer än 100 tecken.";
      } else {
        favoriteAnimalValid = true;
      }
      break;
    }

    case 'dreamJob': {
      if (value.length < 1) {
        dreamJobValid = false;
        validationMessage = "Fältet 'Drömjobb' måste innehålla minst 1 tecken.";
      } else if (value.length > 100) {
        dreamJobValid = false;
        validationMessage =
          "Fältet 'Drömjobb' får inte innehålla mer än 100 tecken.";
      } else {
        dreamJobValid = true;
      }
      break;
    }
    
  }

  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove('hidden');
}


function onSubmit(e) {
  e.preventDefault();
  if (friendNameValid && birthdayValid && interestsValid && favoriteColorValid && favoriteAnimalValid && dreamJobValid) {
    console.log('Submit');
    saveFriend();
  }
}


function saveFriend() {
  const friend = {
    friendName: friendForm.friendName.value,
    birthday: friendForm.birthday.value,
    interests: friendForm.interests.value,
    favoriteColor: friendForm.favoriteColor.value,
    favoriteAnimal: friendForm.favoriteAnimal.value,
    dreamJob: friendForm.dreamJob.value,
  }; 
  
  api.create(friend).then((friend) => {
      if (friend) {
        renderFriendList();
      }
    });
}




function renderFriendList() {
console.log('rendering'); 
api.getAll().then((friends) => { 
  friendListElement.innerHTML = '';
  if (friends && friends.length > 0) {       
    friends.forEach((friend) => {
        friendListElement.insertAdjacentHTML('beforeend', renderFriend(friend));
    });
  }
});
}


function renderFriend({id, friendName, birthday, interests, favoriteColor, favoriteAnimal, dreamJob}) { 
  console.log('ny vän ska komma här')
  let html =`
    <li class="select-none mt-2 py-2 border-b border-zinc-800">
      <div class="flex items-center p-1" id=${id}>
        <h3 class="mb-3 flex-1 text-xs font-bold text-zinc-700 uppercase">${friendName}, födelsedag: ${birthday} ${interests} ${favoriteColor}, ${favoriteAnimal}, ${dreamJob}</h3>
        <button onclick="deleteTask(${id})" class="inline-block hover:bg-blue-300 hover:text-zinc-800 bg-blue-600 text-white text-xs font-semibold text-zinc-800 px-3 py-1 rounded-md ml-2 drop-shadow-md">Ta bort</button> 
      </div>
    </li>`;


return html;
};


function deleteFriend(id) {
  api.remove(id).then((result) => {
    renderFriendList();
  });
}



renderFriendList();