let show=()=>{
$.getJSON("/shoes",(data)=>{
  
  for (let i=0;i<data.length;i++){
    $("#shoes")
    .append(`</br><a href = ${data[i].link}><img src=${data[i].img}></a><h2 data-id="${data[i]._id}">${data[i].title}</h2>`);

  }
});
}

show();

$("#scrape").on("click",()=>{
  $.get('/scrape',()=>{
    $("#shoes").empty();
    show();
  })
})
