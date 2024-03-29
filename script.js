//DOM Collection

var stateValue
var countyValue
var stateFilter = $("select[name='state-filter']")

var repContainer = $("#rep-container")
var rep
var socialBadgeArray
var socialBadges
var statementBadgeArray
var statementBadges = $(".statement-badges")
var filteredReps
var z=""


//appending filters
//appending states
for (let i = 0; i < statesArray.length; i++) {
  stateFilter.append(`<option value="${statesArray[i].state}">${statesArray[i].state}</option>`)
}
//appending ALL counties
// appendCounties(countiesArray)

//appending filtered counties
function appendCounties(countyList) {
  countyFilter.empty()
  countyFilter.append(`<option value="any" selected>Any County</option>`)
  for (let i = 0; i < countyList.length; i++) {
    countyFilter.append(`<option value="${countyList[i].county}">${countyList[i].county}</option>`)

  }
}


//creating cards
function createCards(repArray) {
  repContainer.empty()
  for (let i = 0; i < repArray.length; i++) {

    rep = repArray[i]

    //getting socials
    socialBadgeArray = []

    if (rep.contact.website !== "") {
      socialBadgeArray.push(`<a href="${rep.contact.website}"><img src="assets/socialIcons/website.png" alt="${rep.name}'s Website'"></a>`)
    }
    if (rep.contact.x !== "") {
      socialBadgeArray.push(`<a href="x.com/${rep.contact.x}"><img src="assets/socialIcons/x.png" alt="X"></a>`)
    }

    if (rep.contact.instagram !== "") {
      socialBadgeArray.push(`<a href="instagram.com/${rep.contact.instagram}"><img src="assets/socialIcons/instagram.png" alt="Instagram"></a>`)
    }

    if (rep.contact.tiktok !== "") {
      socialBadgeArray.push(`<a href="tiktok.com/${rep.contact.tiktok}"><img src="assets/socialIcons/tiktok.png" alt="TikTok"></a>`)
    }

    if (rep.contact.facebook !== "") {
      socialBadgeArray.push(`<a href="facebook.com/${rep.contact.facebook}"><img src="assets/socialIcons/facebook.png" alt="facebook"></a>`)
    }

    socialBadges = socialBadgeArray.toString().replace(/,/g, " ");
    console.log(rep)

  if (rep.repreZent === "TRUE"){
    z = Math.random() * 20-10
    z = `<img src='assets/z.png' alt='part of RepreZent' class='z-sticker' style='transform: rotate(${z}deg);'>`
  }
  else{
    z=""
  }
    

    repContainer.append(`
  <a href="representatives.html?${rep.identification}" class="card-redirect">
    <section class="rep-card">
    ${z}
        <img src="assets/headshots/${rep.photoSrc}" alt="${rep.name}" id="${rep.identification}">
        <h1>${rep.name}, ${rep.age}</h1>
        
        <h2>${rep.county}, ${rep.state}</h2>
        <h2 class="seat"><strong>${rep.seat}</strong></h2>
        <article class="contact-badges">
          ${socialBadges}
        </article>
    </section>
  </a>
  `)

  }
}

createCards(allReps)



// countyFilter.on("change", filterReps)
stateFilter.on("change", countyManipulation)


function countyManipulation() {
  
  stateValue = stateFilter.val()
  console.log(stateValue)

  var filteredStates = []

  for (let i = 0; i < countiesArray.length; i++) {

  
    if (countiesArray[i].state === stateValue) {
      filteredStates.push(countiesArray[i])
      // countyFilter.css("display", "none")
    }
  }

  if (stateValue === "any") {
    // countyFilter.css("display", "none")
    createCards(allReps)

  }
  else {
    filterReps()
  }




}



function filterReps() {
  repContainer.empty()
  console.log("hi")
  stateValue = stateFilter.val()
  // countyValue = countyFilter.val()
  filteredReps = []

  for (let i = 0; i < allReps.length; i++) {
    if (allReps[i].state === stateValue) {
      filteredReps.push(allReps[i])
      console.log(filteredReps)
    }
  }

  for (let i = 0; i < filteredReps.length; i++) {
    createCards(filteredReps)
  }
}


