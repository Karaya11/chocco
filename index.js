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