const search_area = document.querySelector('.search_area');


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzBhOWYwMjNmN2FkMzBiOTE3MmNjZDI3OTcwOWQwZCIsInN1YiI6IjY1MmY2NjMwYTgwMjM2MDBlMGFjYzg3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XOaZFgBhpndKwkAE1cwnh5dD6huAwQX-Qd4CeeQAWU0'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    // 데이터 불러와서 카드로 붙히기
    let rows = response['results']; // 필요한 배열 가져오기
    const cardList = document.querySelector(".cardlist");
    cardList.innerHTML = '';

    // 카드 붙히기
    rows.forEach(a => {
      let img = a['poster_path'];
      let title = a['title'];
      let overview = a['overview'];
      let rank = a['vote_average'];
      let id = a['id'];

      let temp_html = `
      <div class="card" data_id = "${id}">
      <img id="cardimg" src="https://image.tmdb.org/t/p/original${img}" alt="이미지">
      <h3 class="movietitle" id="cardtitle">${title}</h3>
      <div class="moviecontent">
        <p id="cardcontent">${overview}</p>
        <p style="color: burlywood;" id="cardrank">Rating: ${rank}</p>
      </div>
      `;

      cardList.insertAdjacentHTML('beforeend', temp_html);
    });

    // card를 눌렀을 때 ID 띄우기
    let cards = document.querySelectorAll('.card');
  cards.forEach(function(a) {
    a.addEventListener('click', function() {
      let movieid = this.getAttribute('data_id');
      alert(`영화 ID : ${movieid}`);
    })
  });
  
  // 검색 기능
  function find(event) {
    event.preventDefault(); // 이벤트가 발생 했을 때 기본동작 막아줌
    const searchInput = document.getElementById('search_input');
    const rows = response['results'];
    const values = searchInput.value.toLowerCase();
    searchInput.value = "";
  
  //기존 배열의 요소를 인덱스 값으로 받아 그 요소의 타이틀로 새로운 배열 리턴
  let titleList = rows.map((item) => {
    return item.title.toLowerCase();
  });
  
  // values의 검색어와 위에 값이 포함되어 있는 타이틀 반환
  let find_title = titleList.filter((item) => {
    return item.includes(values);
  })

  // 전체 타이틀 리스트에서 일치하는 인덱스 찾기
  let find_index =[];

  for (let i in find_title) {
    let idx = titleList.findIndex((item) => {
      return item === find_title[i];
    });

    find_index.push(idx);
  }

  // 값이 없으면 alert
  if (find_index.length === 0) {
    alert('검색 결과가 없습니다.');
  } else { // 값이 있으면 새로운 배열 리턴 
    let match_movie = []
      for (let a of find_index) {
    let movies = rows[a];
    match_movie.push(movies);
  }
    // 빈 공간에 찾은 결과 카드 붙히기
    cardList.innerHTML = '';

    match_movie.forEach((result) => {
    const find_img = result['poster_path'];
    const find_title = result['title'];
    const find_overview = result['overview'];
    const find_rank = result['vote_average'];
    const find_id = result['id'];

    const temp_html = `<div class="card" data_id = "${find_id}">
    <img id="cardimg" src="https://image.tmdb.org/t/p/original${find_img}" alt="이미지">
    <h3 class="movietitle" id="cardtitle">${find_title}</h3>
    <div class="moviecontent">
      <p id="cardcontent">${find_overview}</p>
      <p style="color: burlywood;" id="cardrank">Rating: ${find_rank}</p>
    </div>`;
    
    cardList.insertAdjacentHTML('beforeend', temp_html);
    });
  };
}; 
search_area.addEventListener('submit', find); // 폼 클래스에 이벤트를 만들어 submit타입에 find함수 실행


})
  .catch(err => console.error(err));

  



