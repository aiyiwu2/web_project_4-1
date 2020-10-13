
import '../page/index.css';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const dataConfig = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  };

//wrappers
const editProfileModal = document.querySelector('.modal_type_edit-profile');/* variable for the whole .modal_type_edit-profile class*/
const addCardModal = document.querySelector('.modal_type_add-card');/* variable for the whole .modal_type_add-card class*/

const editProfileForm = editProfileModal.querySelector('.modal__form')
const addCardForm = addCardModal.querySelector('.modal__form')
  
//validation
const editProfileValidator = new FormValidator(dataConfig, editProfileForm);
const addCardValidator = new FormValidator(dataConfig, addCardForm);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();

//buttons & DOMS
const editBtn = document.querySelector('.profile__edit-btn');/* creates the variable editBtn that equals the class .profile__edit-btn(aka we want to select the pencil, which we've named .profile__edit-btn)*/
const addCardButton = document.querySelector(".profile__add-btn");/* creates the variable editBtn that equals the class .profile__add-btn(aka we want to select the plus sing, which we've named .profile__edit-btn)*/


//userInfo
const userInfo = new UserInfo('.form__name-input', '.form__job-input');
//Form Popup
const formPopup = new PopupWithForm({
    popupSelector: editProfileModal, handleSubmitForm: () => {
        userInfo.setUserInfo();
    }

});
formPopup.setEventListeners();





//card variables
const inputTitle = document.querySelector('.form__title-input'); /* creates a constant variable for the .form__title-input class */
const inputUrl = document.querySelector('.form__url-input');
const photoGrid = document.querySelector('.photo-grid');



editBtn.addEventListener('click', () => {
    formPopup.open();
    userInfo.getUserInfo();
}); /* what it will do when we click on the editBtn (adds the modal_display class to editProfileModal or toggles the modal_display) */

//initial cards autocreated each time the page refreshes
const initialCards = [
    {
        name: "Yosemite Valley",
        link: "./images/Yosemite.png"
    },
    {
        name: "A Tree Somewhere",
        link: "https://images.unsplash.com/photo-1591971737811-cf7de8c11f32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
    },
    {
        name: "The Moon",
        link: "https://images.unsplash.com/photo-1592035187437-47c0fe77a452?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1391&q=80"
    },
    {
        name: "Latemar",
        link: "./images/Latemar.png"
    },
    {
        name: "Chilhowee Mountain",
        link: "https://images.unsplash.com/photo-1590096598321-a42e180df31d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80"
    },
    {
        name: "Waterfall",
        link: "https://images.unsplash.com/photo-1541294725825-94318746d378?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
    }
];

//image display variables
const imgModal = document.querySelector('.modal_type_display-image');
const cardTemplateSelector = ('.card-template');

const enlargeImage = new PopupWithImage(imgModal);
enlargeImage.setEventListeners();

//Creates Initial Card set
const cardGrid = new Section({
    data: initialCards,
    renderer: (data)=>{
        const newCards = new Card({
            data,
            handleCardClick: ()=>{
                enlargeImage.open(data);}
            },
            cardTemplateSelector)

        cardGrid.addItem(newCards.createCard());
    }
},photoGrid
);
cardGrid.renderItems();


//CardPopup
    const cardPopup = new PopupWithForm({
        popupSelector: addCardModal, handleSubmitForm: (data) => {
            const card = new Card({
                data: {name: inputTitle.value, link: inputUrl.value}, 
                handleCardClick: () => {
                    enlargeImage.open({name: data.title, link: data.url});
                }
            },cardTemplateSelector)
            photoGrid.prepend(card.createCard());
            }
    
    });
    cardPopup.setEventListeners();

    addCardButton.addEventListener('click', () => {
        cardPopup.open();
    }); /* what it will do when we select the variable(read above) */



