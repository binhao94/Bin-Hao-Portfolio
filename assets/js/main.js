
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
  if(!slideshow){ return; }

  const thumbs = Array.from(document.querySelectorAll('[data-ei-thumb]'));
  const mainImage = document.querySelector('[data-ei-main-image]');
  const caption = document.querySelector('[data-ei-caption]');
  const lightbox = document.querySelector('[data-ei-lightbox]');
  const lightboxImage = document.querySelector('[data-ei-lightbox-image]');
  const lightboxCaption = document.querySelector('[data-ei-lightbox-caption]');

  if(!thumbs.length || !mainImage || !caption){ return; }

  let currentIndex = thumbs.findIndex((thumb)=> thumb.classList.contains('is-active'));
  if(currentIndex < 0){ currentIndex = 0; }

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

  const render = (index, updateLightbox)=>{
    currentIndex = normalizeIndex(index);
    const slide = getSlide(currentIndex);

    mainImage.src = slide.src;
    mainImage.alt = slide.alt;
    caption.textContent = slide.caption;
    thumbs.forEach((thumb, thumbIndex)=>{
      thumb.classList.toggle('is-active', thumbIndex === currentIndex);
    });

    if(updateLightbox && lightbox && !lightbox.hidden && lightboxImage && lightboxCaption){
      lightboxImage.src = slide.src;
      lightboxImage.alt = slide.alt;
      lightboxCaption.textContent = slide.caption;
    }
  };

  const stepSlide = (delta)=>{ render(currentIndex + delta, true); };

  const openLightbox = ()=>{
    if(!lightbox || !lightboxImage || !lightboxCaption){ return; }
    lightbox.hidden = false;
    document.body.classList.add('ei-no-scroll');
    render(currentIndex, true);
  };

  const closeLightbox = ()=>{
    if(!lightbox){ return; }
    lightbox.hidden = true;
    document.body.classList.remove('ei-no-scroll');
  };

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
      openLightbox();
    }
  });

  thumbs.forEach((thumb, index)=>{
    thumb.addEventListener('click', ()=>{ render(index, true); });
  });

  if(lightbox){
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
        stepSlide(-1);
        return;
      }
      if(action === 'next'){
        stepSlide(1);
      }
    });
  }

  document.addEventListener('keydown', (event)=>{
    if(!lightbox || lightbox.hidden){ return; }

    if(event.key === 'Escape'){
      closeLightbox();
      return;
    }
    if(event.key === 'ArrowLeft'){
      stepSlide(-1);
      return;
    }
    if(event.key === 'ArrowRight'){
      stepSlide(1);
    }
  });

  render(currentIndex, true);
})();
