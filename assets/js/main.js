document.addEventListener('click', (e)=>{
  if(e.target.matches('[data-copy]')){
    const v = e.target.getAttribute('data-copy');
    navigator.clipboard.writeText(v).then(()=>{
      e.target.textContent = 'Copied!';
      setTimeout(()=> e.target.textContent = 'Copy email', 1200);
    });
  }
});

(()=>{
  const slideshow = document.querySelector('[data-ei-slideshow]');
  const thumbs = Array.from(document.querySelectorAll('[data-ei-thumb]'));
  const singleImageTriggers = Array.from(document.querySelectorAll('[data-ei-open-image]'));
  const mainImage = document.querySelector('[data-ei-main-image]');
  const caption = document.querySelector('[data-ei-caption]');
  const lightbox = document.querySelector('[data-ei-lightbox]');
  const lightboxImage = document.querySelector('[data-ei-lightbox-image]');
  const lightboxCaption = document.querySelector('[data-ei-lightbox-caption]');
  const hasSlideshow = Boolean(slideshow && thumbs.length && mainImage && caption);

  if(!lightbox || !lightboxImage || !lightboxCaption){ return; }
  if(!hasSlideshow && !singleImageTriggers.length){ return; }

  let currentIndex = thumbs.findIndex((thumb)=> thumb.classList.contains('is-active'));
  if(currentIndex < 0){ currentIndex = 0; }
  let lightboxMode = 'slideshow';

  const normalizeIndex = (index)=>{
    const total = thumbs.length;
    return (index % total + total) % total;
  };

  const getSlide = (index)=>{
    const thumb = thumbs[index];
    return {
      src: thumb.dataset.src || '',
      alt: thumb.dataset.alt || '',
      caption: thumb.dataset.caption || ''
    };
  };

  const setLightboxMode = (mode)=>{
    lightboxMode = mode;
    lightbox.classList.toggle('ei-lightbox-single', mode === 'single');
  };

  const render = (index, updateLightbox)=>{
    if(!hasSlideshow){ return; }
    currentIndex = normalizeIndex(index);
    const slide = getSlide(currentIndex);

    mainImage.src = slide.src;
    mainImage.alt = slide.alt;
    caption.textContent = slide.caption;
    thumbs.forEach((thumb, thumbIndex)=>{
      thumb.classList.toggle('is-active', thumbIndex === currentIndex);
    });

    if(updateLightbox && !lightbox.hidden && lightboxMode === 'slideshow'){
      lightboxImage.src = slide.src;
      lightboxImage.alt = slide.alt;
      lightboxCaption.textContent = slide.caption;
    }
  };

  const stepSlide = (delta)=>{
    if(!hasSlideshow){ return; }
    render(currentIndex + delta, true);
  };

  const openSlideshowLightbox = ()=>{
    if(!hasSlideshow){ return; }
    setLightboxMode('slideshow');
    lightbox.hidden = false;
    document.body.classList.add('ei-no-scroll');
    render(currentIndex, true);
  };

  const openSingleImageLightbox = (trigger)=>{
    const src = trigger.dataset.eiSrc || '';
    const alt = trigger.dataset.eiAlt || '';
    const captionText = trigger.dataset.eiCaption || alt;
    if(!src){ return; }

    setLightboxMode('single');
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxCaption.textContent = captionText;
    lightbox.hidden = false;
    document.body.classList.add('ei-no-scroll');
  };

  const closeLightbox = ()=>{
    lightbox.hidden = true;
    document.body.classList.remove('ei-no-scroll');
  };

  if(hasSlideshow){
    slideshow.addEventListener('click', (event)=>{
      const actionTarget = event.target.closest('[data-ei-action]');
      if(!actionTarget){ return; }

      const action = actionTarget.dataset.eiAction;
      if(action === 'prev'){
        stepSlide(-1);
        return;
      }
      if(action === 'next'){
        stepSlide(1);
        return;
      }
      if(action === 'open-lightbox'){
        openSlideshowLightbox();
      }
    });

    thumbs.forEach((thumb, index)=>{
      thumb.addEventListener('click', ()=>{ render(index, true); });
    });
  }

  singleImageTriggers.forEach((trigger)=>{
    trigger.addEventListener('click', ()=>{ openSingleImageLightbox(trigger); });
  });

  lightbox.addEventListener('click', (event)=>{
    if(event.target === lightbox){
      closeLightbox();
      return;
    }

    const actionTarget = event.target.closest('[data-ei-action]');
    if(!actionTarget){ return; }

    const action = actionTarget.dataset.eiAction;
    if(action === 'close-lightbox'){
      closeLightbox();
      return;
    }
    if(action === 'prev'){
      if(lightboxMode === 'slideshow'){
        stepSlide(-1);
      }
      return;
    }
    if(action === 'next'){
      if(lightboxMode === 'slideshow'){
        stepSlide(1);
      }
    }
  });

  document.addEventListener('keydown', (event)=>{
    if(lightbox.hidden){ return; }

    if(event.key === 'Escape'){
      closeLightbox();
      return;
    }

    if(lightboxMode !== 'slideshow'){ return; }
    if(event.key === 'ArrowLeft'){
      stepSlide(-1);
      return;
    }
    if(event.key === 'ArrowRight'){
      stepSlide(1);
    }
  });

  if(hasSlideshow){
    render(currentIndex, true);
  }
})();
