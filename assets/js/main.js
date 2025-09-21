
document.addEventListener('click', (e)=>{
  if(e.target.matches('[data-copy]')){
    const v = e.target.getAttribute('data-copy');
    navigator.clipboard.writeText(v).then(()=>{
      e.target.textContent = 'Copied!';
      setTimeout(()=> e.target.textContent = 'Copy email', 1200);
    });
  }
});
