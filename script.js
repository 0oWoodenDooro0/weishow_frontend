const moviesContainer = document.getElementById('movies');
const seats = document.querySelectorAll('.seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
let ticketPrice = 0;

// 從後端 API 獲取電影資料
async function fetchMovies() {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer a974f9b8a917f49dd75168ff85072644");

    var requestOptions = {

    method: 'GET',

    headers: myHeaders,

    redirect: 'follow'

    };
    try {
        const response = await fetch('http://woodendoor.duckdns.org:8080/movie', requestOptions); // 後端 API URL
        const movies = await response.json();
        renderMovies(movies["data"]); // 動態渲染電影卡片
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// 動態生成電影卡片
function renderMovies(data) {
    moviesContainer.innerHTML = ""; // 清空容器
    data.forEach((movie) => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${movie.thumbnailPath}" alt="${movie.name}">
            <h3>${movie.name}</h3>
        `;
        card.addEventListener('click', () => {
            document.querySelectorAll('.movie-card').forEach(card => card.classList.remove('selected'));
            card.classList.add('selected');
            ticketPrice = movie.price;
            updateSummary();
        });
        moviesContainer.appendChild(card);
    });
}

// 更新座位選擇和總計
function updateSummary() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.textContent = selectedSeatsCount;
    total.textContent = selectedSeatsCount * ticketPrice;
}

// 監聽座位選擇
seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('occupied')) {
            seat.classList.toggle('selected');
            updateSummary();
        }
    });
});

// 搜尋功能
function filterMovies() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query)
    );
    renderMovies(filteredMovies);
}

// 實現頁面切換功能
function navigateTo(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// 購票功能
function goToBooking() {
    const location = document.getElementById("location").value;
    const movie = document.getElementById("movie").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!location || !movie || !date || !time) {
        alert("請完整填寫所有欄位！");
        return;
    }

    alert(`前往訂票：
影城: ${location}
影片: ${movie}
日期: ${date}
場次: ${time}`);
}

function checkSeats() {
    const location = document.getElementById("location").value;
    const movie = document.getElementById("movie").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!location || !movie || !date || !time) {
        alert("請完整填寫所有欄位！");
        return;
    }

    alert(`查看座位：
影城: ${location}
影片: ${movie}
日期: ${date}
場次: ${time}`);
}

// 初始化：拉取電影資料
fetchMovies();
