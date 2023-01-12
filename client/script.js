/* Eventlyssnare för vardera inputfält */
friendForm.friendName.addEventListener('input', (e) => validateField(e.target));
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

/* Eventlyssnare som lyssnar efter ett submit-event på submit-knappen */
friendForm.addEventListener('submit', onSubmit);

/* Hämtar ul-elementet med id: friendList från HTML-koden  */
const friendListElement = document.getElementById('friendList');

/* validering - ser till att fälterna är ifyllde korrekt */
let friendNameValid = true;
let birthdayValid = true;
let interestsValid = true;
let favoriteColorValid = true;
let favoriteAnimalValid = true;
let dreamJobValid = true;



/* Instans av api-klassen (Api.js) */
const api = new Api('http://localhost:5000/friends');


/* Callbackfunktion kopplad till formulärets fält, name = namnet på inputfältet (t.ex. friendName) och value = det som användaren skriver in i fältet
Switchsats som används för att kolla name på fältet. En valideringskoll görs på varje name-attribut i formuläret och ska kolla efter längd på inputen.
Om texten är för lång eller kort skriv ett felmeddelande ut  */
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
  /* Om användaren gör felaktig input syns valideringsmeddelandet (ändras i <p>-elementet från HTML), då tas tailwinds klass "hidden" bort.  */
  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove('hidden');
}

/* Callbackfunktion som används för eventlyssnare när användaren klickar på submit-knappen
preventDefault används för att förhinda webbsidan att ladda om
Om alla valideringar är godkända anropas funktionen saveFriend.  */
function onSubmit(e) {
  e.preventDefault();
  if (friendNameValid && birthdayValid && interestsValid && favoriteColorValid && favoriteAnimalValid && dreamJobValid) {
    saveFriend();
  }
}

/* Funktionen som tar hand om formulärets input och skickar till api-klassen.
Ett nytt objekt vid namn friend skapas av inputens value */
function saveFriend() {
  const friend = {
    friendName: friendForm.friendName.value,
    birthday: friendForm.birthday.value,
    interests: friendForm.interests.value,
    favoriteColor: friendForm.favoriteColor.value,
    favoriteAnimal: friendForm.favoriteAnimal.value,
    dreamJob: friendForm.dreamJob.value,
  }; 
  
  /* anropar create-metod från api-klassen, som är en asynkron funktion och returnerar ett promise.
   Create översätter input infon till json-data som sparas i vår api, för sedan med then() att översättas tillbaka till javascript-data. 
   Om objektet friend finns så aropas funktionen renderFriendList som uppdaterar vår mina vänner-lista*/
  api.create(friend).then((friend) => {
      if (friend) {
        renderFriendList();
      }
    });
}


/* Funktionen som skriver ut vännerna i Ul-elementet.
Anrop till getAll-metoden som fetchar alla objekt som finns i friends och skrivs ut som dynamisk HTML
Om arrayen med friends är större än 0 loopas den igenom med forEach och skapar sedan upp ett nytt element med hjälp av funktionen renderFriend  */
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


/* Funktionen renderFriend bestämmer hur li-elementet som skapat i funktionen ovan ska se ut med HTML-kod.
Eventlyssnare på knapp för att ta bort vän */
function renderFriend({id, friendName, birthday, interests, favoriteColor, favoriteAnimal, dreamJob}) { 
  console.log('ny vän ska komma här')
  let html =`
    <li class="select-none py-4 px-3 border-b border-pink-500">
      <h3 class="mb-2 flex-1 text-xl font-serif font-bold text-zinc-800">${friendName}</h3>
      <div class="grid grid-cols-2" id=${id}>    
          <p class="mb-2 flex-1"><span class="font-semibold text-zink-800">Födelsedag: </span>${birthday}</p> 
          <p class="mb-2 flex-1"><span class="font-semibold text-zink-800">Intressen: </span> ${interests}</p>
          <p class="mb-2 flex-1"><span class="font-semibold text-zinc-800">Favoritfärg: </span>${favoriteColor}</p>
          <p class="mb-2 flex-1"><span class="font-semibold text-zinc-800">Favoritdjur: </span>${favoriteAnimal}</p>
          <p class="mb-2 flex-1"><span class="font-semibold text-zinc-800">Drömyrke: </span>${dreamJob}</p>
        <div class="grid">
          <button onclick="deleteFriend(${id})" class="justify-self-end inline-block bg-gradient-to-r from-green-200 to-blue-200 hover:from-pink-200 hover:to-yellow-200 text-xs font-semibold text-zinc-800 px-3 py-1 rounded-md ml-2 drop-shadow-md">Ta bort</button>
        </div>
      </div>

    </li>`;


return html;
};





/* Funktion för att ta bort vän från listan. Anropar remove-metoden från api-klassen (via objektets id).
Listan uppdateras med hjälp av funktionen renderFriendList */
function deleteFriend(id) {
  api.remove(id).then((result) => {
    renderFriendList();
  });
}


/* funktionen renderFriendList anropas direkt så att listan med vänner syns direkt när man öppnar hemsidan (om det finns vänner på listan) */
renderFriendList();