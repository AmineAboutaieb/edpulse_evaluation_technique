let form_email = document.getElementById("form_email");
let form_nom = document.getElementById("form_nom");
let form_prenom = document.getElementById("form_prenom");
let form_age = document.getElementById("form_age");
let form_telephone = document.getElementById("form_telephone");
let form_submit_btn = document.getElementById("form_submit_btn");

const checkIfFieldIsEmpty = (field, fieldName, showToast) => {
    if(field?.value != null && field?.value != undefined && field?.value?.trim() != ""){
        return false;
    }
    if(showToast){
        toastr.warning(`Le champ ${fieldName} est requis`);
    }
    return true;
}

const checkIfEmailIsValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(email)){
        toastr.warning(`Le format de l'email est invalide`);
        return false;
    }
    return true;
}


const checkIfAgeIsValid = (age) => {
    const agePattern = /^\d+$/;
    
    if(!agePattern.test(age)){
        toastr.warning(`Le format de l'age est invalide`);
        return false;
    }
    return true;
}

const checkIfTelIsValid = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    
    if(!phonePattern.test(phoneNumber)){
        toastr.warning(`Le format du numéro de téléphone est invalide`);
        return false;
    }
    return true;
}

const sendRequestHandler = () => {
    let email = form_email?.value;
    let prenom = form_prenom?.value;
    let nom = form_nom?.value;
    let age = form_age?.value;
    let telephone = form_telephone?.value;
    fetch("https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZkMDYzMTA0MzU1MjZjNTUzYzUxMzAi_pc", {method: 'POST', body: JSON.stringify({
        "nom":nom,
        "prenom": prenom,
        "age": age,
        "email": email,
        "telephone": telephone
    })}).then((rawRes)=>rawRes.json().then(res=>{
        console.log(res);
        form_email.value = '';
        form_prenom.value = '';
        form_nom.value = '';
        form_age.value = '';
        form_telephone.value = '';
        toastr.success('Merci pour votre souscription !');
    })).catch(err=>{
        console.log(err);
        toastr.error('Une erreur est survenue');
    })
}

const sendIncompleteRequestHandler = () => {
    let email = form_email?.value ?? "";
    let prenom = form_prenom?.value ?? "";
    let nom = form_nom?.value ?? "";
    let age = form_age?.value ?? "";
    let telephone = form_telephone?.value ?? "";
    fetch("https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZkMDYzMTA0MzU1MjZjNTUzMzUxM2Ei_pc", {method: 'POST', body: JSON.stringify({
        "nom":nom,
        "prenom": prenom,
        "age": age,
        "email": email,
        "telephone": telephone
    })}).then((rawRes)=>rawRes.json().then(res=>{
        console.log(res);
    })).catch(err=>{
        console.log(err);
        toastr.error('Une erreur est survenue');
    })
}

const submitContactFormHandler = (e) => {
    e?.preventDefault();
    let emailCheckIsEmpty = checkIfFieldIsEmpty(form_email, 'Email', true);
    let nomCheckIsEmpty = checkIfFieldIsEmpty(form_nom, 'Nom', true);
    let prenomCheckIsEmpty = checkIfFieldIsEmpty(form_prenom, 'Prénom', true);
    let ageCheckIsEmpty = checkIfFieldIsEmpty(form_age, 'Age', true);
    let telephoneCheckIsEmpty = checkIfFieldIsEmpty(form_telephone, 'Téléphone', true);
    if(!emailCheckIsEmpty && !nomCheckIsEmpty && !prenomCheckIsEmpty && !ageCheckIsEmpty && !telephoneCheckIsEmpty){
        let isEmailValid = checkIfEmailIsValid(form_email?.value);
        let isAgeValid = checkIfAgeIsValid(form_age?.value);
        let isTelValid = checkIfTelIsValid(form_telephone?.value);
        if(isEmailValid && isAgeValid && isTelValid){
            sendRequestHandler();   
        }
    }
    if((nomCheckIsEmpty || prenomCheckIsEmpty || ageCheckIsEmpty || telephoneCheckIsEmpty) && !emailCheckIsEmpty){
        sendIncompleteRequestHandler();
    }
}


form_submit_btn.addEventListener("click", submitContactFormHandler);