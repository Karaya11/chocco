// modal-menu
const body = document.querySelector('body')
const btn = document.querySelector('.hamburger');
const modal = document.querySelector('.fullscreen-menu');
const close = document.querySelector('.fullscreen-menu__close');

btn.addEventListener("click", function (open) {
  modal.classList.add('fullscreen-menu--active');
  body.classList.add('body__hide-overflow');
  open.preventDefault();
});

close.addEventListener('click', function (close) {
  if (modal.classList.contains('fullscreen-menu--active')) {
    modal.classList.remove('fullscreen-menu--active') || body.classList.remove('body__hide-overflow');
    close.preventDefault();
  }
})


// reviews
const findBlockByAlias = (alias) => {
  return $(".reviews__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") === alias;
  });
};

$(".interactive-avatar__link").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-open');
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest('.interactive-avatar');

  itemToShow.addClass("reviews__item--active").siblings().removeClass("reviews__item--active")
  curItem.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active')
});


//vert-acco
const openItem = item => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block");
  const reqHeight = textBlock.height();


  container.addClass("active");
  contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
  const items = container.find('.team__content');
  const itemContainer = container.find(".team__item");

  itemContainer.removeClass("active");
  items.height(0);
}

$('.team__title').click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest(".team");
  const elemContainer = $this.closest('.team__item');

  if (elemContainer.hasClass('active')) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }
})


// slider

const slider = $('.slider').bxSlider({
  pager: false,
  controls: false
});

$('.slider__btn--prev').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
})

$('.slider__btn--next').click(e => {
  e.preventDefault();
  slider.goToNextSlide();
})

// modal

const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach(field => {
    field.removeClass('input-error');
    if (field.val().trim() == "") {
      field.addClass('input-error');
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length == 0;
}


$('.form').submit((e) => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");

  modal.removeClass("error-modal");

  const isValid = validateFields(form, [name, phone, comment, to]);



  const errorFields = form.find(".input-error");


  if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
      error: data => {
      }
    });

    request.done(data => {
      content.text(data.message);
    });

    request.fail(data => {
      const message = data.responseJSON.message;
      content.text(message);
      modal.addClass('error-modal');
    });

    request.always(() => {
      $.fancybox.open({
        src: "#modal",
        type: "inline"
      });
    });
  }
});

$(".app-submit-btn").click(e => {
  e.preventDefault();

  $.fancybox.close();
})

  //hor-acco

  ; (function () {
    /////////// menu accordion

    let menuItemLink = document.querySelectorAll(".products__block"),
      menuItemLinkLength = menuItemLink.length;
    let menuItem = document.querySelectorAll(".products__item"),
      menuItemLength = menuItem.length;
    let menuItemClose = document.querySelectorAll(".products__accordion-close"),
      menuItemCloseLength = menuItemClose.length;

    function menuActiveDelete() {
      for (let i = 0; i < menuItemLength; ++i) {
        menuItem[i].classList.remove("products__item--active");
      }
    }

    for (let i = 0; i < menuItemLinkLength; i++) {
      menuItemLink[i].addEventListener("click", function () {
        if (menuItemLink[i].parentNode.classList.contains("products__item--active")) {
          menuItemLink[i].parentNode.classList.remove("products__item--active");
        } else {
          menuActiveDelete();
          menuItemLink[i].parentNode.classList.add("products__item--active");
        }
      });
    }

    for (let i = 0; i < menuItemCloseLength; i++) {
      menuItemClose[i].addEventListener("click", function () {
        menuActiveDelete();
      });
    }
  })()


//player

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



let playControls = document.querySelector(".player_controls");
let playBtn = document.querySelector(".play_btn");
let playControl = document.querySelector(".play_timer");
let voluemBtn = document.querySelector(".volume_btn");
let voluemControl = document.querySelector(".volume_range");

let videoDuration = document.querySelector(".player__duration-estimate");
let completedDuration = document.querySelector(".player__duration-completed");

let playPointDuration = document.querySelector(".play_point-duration");

let playTimer = document.querySelector(".player_timer_wrap");

let playerSplash = document.querySelector(".player__splash");

let playerWrapper = document.querySelector(".player__wrapper");

let volumeRange = document.querySelector(".volume_range-wrap");
let volumePointDuration = document.querySelector(".volume_point-duration");

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player_content", {
    videoId: "3WAOxKOmR90",
    playerVars: {
      controls: 0,
      disabledkb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}


function onPlayerStateChange(event) {
  switch (event.data) {
    case 1:
      playerWrapper.classList.add("player__wrapper--active");
      playBtn.classList.add("player_paused");
      break;
    case 2:
      playBtn.classList.remove("player_paused");
      break;
  }
}

function onPlayerReady() {
  let getDurationInSeconds = player.getDuration();
  let interval;

  clearInterval(interval);

  interval = setInterval(() => {
    let compleatedSeconds = player.getCurrentTime();
    let percent = (compleatedSeconds / getDurationInSeconds) * 100;
    playPointDuration.style.left = `${percent}%`;
    completedDuration.textContent = formatTime(compleatedSeconds);
  }, 1000);

  videoDuration.textContent = formatTime(getDurationInSeconds);
}

function formatTime(time) {
  let roundTime = Math.round(time);

  let minutes = Math.floor(roundTime / 60);

  let seconds = roundTime - minutes * 60;

  let formatSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formatSeconds}`;
}

playBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (playBtn.classList.contains("player_paused")) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

playTimer.addEventListener("click", e => {
  e.preventDefault();
  let newPointPosition = e.pageX - playTimer.getBoundingClientRect().left;
  let clickedPercent =
    (newPointPosition / parseInt(getComputedStyle(playTimer).width)) * 100;
  let newPlayerTime = (player.getDuration() / 100) * clickedPercent;

  if (clickedPercent < 100) {
    playPointDuration.style.left = `${clickedPercent}%`;
  }
  player.seekTo(newPlayerTime);
});

playerSplash.addEventListener("click", e => {
  player.playVideo();
});

voluemBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (voluemBtn.classList.contains("volume_btn--active")) {
    player.unMute();
    voluemBtn.classList.remove("volume_btn--active");
  } else {
    player.unMute();
    player.mute();
    voluemBtn.classList.add("volume_btn--active");
  }
});

volumeRange.addEventListener("click", e => {
  e.preventDefault();
  let newVolumePosition = e.pageX - volumeRange.getBoundingClientRect().left;
  let clickedVolumePercent =
    (newVolumePosition / parseInt(getComputedStyle(volumeRange).width)) * 100;

  if (clickedVolumePercent < 100) {
    volumePointDuration.style.left = `${clickedVolumePercent}%`;
  }

  player.setVolume(clickedVolumePercent);
});


//MAP
let myMap;

const init = () => {
  myMap = new ymaps.Map('map', {
    center: [31.672866, 68.007997],
    zoom: 7,
    controls: []
  });

  const coords = [
    [31.637191, 65.731538],
    [30.208289, 67.006236],
    [34.518163, 69.208745],
    [33.982511, 71.496061]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: "default#image",
    iconImageHref: "./img/Group.svg",
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52],
  })

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);
}

ymaps.ready(init);

//OPS

const sections = $('section');
const display = $('.maincontent');
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

let inScroll = false

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;

  if(isNaN(position)){
    console.error('передано неверное значение в countSectionPosition');
    return 0;
  }

  return position;
}

const changeMenuThemeForSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu--shadowed";

  if (menuTheme == "black") {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass("fixed-menu--shadowed");
  }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {

  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  inScroll = true;

  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);


  display.css({
    transform: `translateY(${position}%)`
  });

  resetActiveClassForItem(sections, sectionEq, "active");

  setTimeout(() => {
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");

  }, transitionOver + mouseInertiaOver);
};


const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index())
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index())
      }
    }
  }



};

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }


});

$(window).on("keydown", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == 'input' || tagName == "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38:
      scroller.prev();
      break;

    case 40:
      scroller.next();
      break;
  }
});

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

//OPS mobile

$("body").swipe({
  swipe: function (event, direction) {
    const scroller = viewportScroller();
    let scrollDirection = "";

    if (direction == "up") scrollDirection = "next";
    if (direction == "down") scrollDirection = "prev";

    scroller[scrollDirection]();
  },
});