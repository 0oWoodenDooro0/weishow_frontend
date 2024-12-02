const moviesContainer = document.getElementById('movies');
const showtimeSelect = document.getElementById('showtime');
const seats = document.querySelectorAll('.seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

let ticketPrice = 0;

// 電影資料
const movies = [
    { title: "鋼鐵人", price: 180, img: "C:/Users/user/Desktop/Database System/final project/鋼鐵人1.jpg" },
    { title: "雷神索爾", price: 180, img: "C:/Users/user/Desktop/Database System/final project/雷神索爾.jpg" },
    { title: "鋼鐵人2", price: 180, img: "C:/Users/user/Desktop/Database System/final project/鋼鐵人2.jpg" },
    { title: "美國隊長", price: 180, img: "C:/Users/user/Desktop/Database System/final project/美國隊長1.jpg" },
    { title: "復仇者聯盟", price: 180, img: "C:/Users/user/Desktop/Database System/final project/復仇者聯盟.jpg" },
    { title: "鋼鐵人3", price: 180, img: "C:/Users/user/Desktop/Database System/final project/鋼鐵人3.jpg" },
    { title: "雷神索爾2黑暗世界", price: 180, img: "C:/Users/user/Desktop/Database System/final project/雷神索爾2黑暗世界.jpg" },
    { title: "美國隊長-酷寒戰士", price: 180, img: "C:/Users/user/Desktop/Database System/final project/美國隊長-酷寒戰士.jpg" },
    { title: "星際異攻隊", price: 180, img: "C:/Users/user/Desktop/Database System/final project/星際異攻隊.jpg" },
    { title: "復仇者聯盟-奧創紀元", price: 180, img: "C:/Users/user/Desktop/Database System/final project/復仇者聯盟-奧創紀元.jpg" },
    { title: "蟻人", price: 180, img: "C:/Users/user/Desktop/Database System/final project/蟻人.jpg" },
    { title: "美國隊長3-英雄內戰", price: 180, img: "C:/Users/user/Desktop/Database System/final project/美國隊長3-英雄內戰.jpg" },
    { title: "奇異博士", price: 180, img: "C:/Users/user/Desktop/Database System/final project/奇異博士.jpg" },
    { title: "星際異攻隊vol2", price: 180, img: "C:/Users/user/Desktop/Database System/final project/星際異攻隊vol2.jpg" },
    { title: "蜘蛛人-返校日", price: 180, img: "C:/Users/user/Desktop/Database System/final project/蜘蛛人-返校日.jpg" },
    { title: "雷神索爾3-諸神黃昏", price: 180, img: "C:/Users/user/Desktop/Database System/final project/雷神索爾3-諸神黃昏.jpg" },
    { title: "黑豹", price: 180, img: "C:/Users/user/Desktop/Database System/final project/黑豹.jpg" },
];

// 動態生成電影選項
movies.forEach((movie, index) => {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
        <img src="${movie.img}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>票價：NT$${movie.price}</p>
    `;
    card.addEventListener('click', () => {
        document.querySelectorAll('.movie-card').forEach(card => card.classList.remove('selected'));
        card.classList.add('selected');
        ticketPrice = movie.price;
        updateSummary();
    });
    moviesContainer.appendChild(card);
});

// 更新總計
function updateSummary() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.textContent = selectedSeatsCount;
    total.textContent = selectedSeatsCount * ticketPrice;
}

// 座位點擊事件
seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('occupied')) {
            seat.classList.toggle('selected');
            updateSummary();
        }
    });
});
