const moviesContainer = document.getElementById('movies');
const seats = document.querySelectorAll('.seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
let ticketPrice = 0;
const API_URL = "http://woodendoor.duckdns.org:8080";
const AUTH_TOKEN = "Bearer a974f9b8a917f49dd75168ff85072644";

// 檢查是否已登入
let isLoggedIn = false;
let currentMemberId = null; // 用於存儲當前會員 ID

var myHeaders = new Headers();
myHeaders.append("Authorization", AUTH_TOKEN);
myHeaders.append("Content-Type", "application/json");

// 動態生成電影資料
const movies = [
    { title: "鋼鐵人", price: 180, img: "./鋼鐵人1.jpg" },
    { title: "雷神索爾", price: 180, img: "./雷神索爾.jpg" },
    { title: "鋼鐵人2", price: 180, img: "./鋼鐵人2.jpg" },
    { title: "美國隊長", price: 180, img: "./美國隊長1.jpg" },
    { title: "復仇者聯盟", price: 180, img: "./復仇者聯盟.jpg" },
    { title: "鋼鐵人3", price: 180, img: "./鋼鐵人3.jpg" },
    { title: "雷神索爾2黑暗世界", price: 180, img: "./雷神索爾2黑暗世界.jpg" },
    { title: "美國隊長-酷寒戰士", price: 180, img: "./美國隊長-酷寒戰士.jpg" },
    { title: "星際異攻隊", price: 180, img: "./星際異攻隊.jpg" },
    { title: "復仇者聯盟-奧創紀元", price: 180, img: "./復仇者聯盟-奧創紀元.jpg" },
    { title: "蟻人", price: 180, img: "./蟻人.jpg" },
    { title: "美國隊長3-英雄內戰", price: 180, img: "./美國隊長3-英雄內戰.jpg" },
    { title: "奇異博士", price: 180, img: "./奇異博士.jpg" },
    { title: "星際異攻隊vol2", price: 180, img: "./星際異攻隊vol2.jpg" },
    { title: "蜘蛛人-返校日", price: 180, img: "./蜘蛛人-返校日.jpg" },
    { title: "雷神索爾3-諸神黃昏", price: 180, img: "./雷神索爾3-諸神黃昏.jpg" },
    { title: "黑豹", price: 180, img: "./黑豹.jpg" },
];

movies.forEach(movie => {
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

function updateSummary() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.textContent = selectedSeatsCount;
    total.textContent = selectedSeatsCount * ticketPrice;
}

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('occupied')) {
            seat.classList.toggle('selected');
            updateSummary();
        }
    });
});

// 實現頁面切換功能
function navigateTo(pageId) {
    if (pageId === 'membership' && !isLoggedIn) {
        alert('請先登入');
        return;
    }
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// 動態生成電影卡片
function renderMovies(data) {
    moviesContainer.innerHTML = ""; // 清空容器
    data.forEach((movie) => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
            <img src="${movie.img}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>票價：NT$${movie.price}</p>
        `;
        moviesContainer.appendChild(card);
    });
}

// 初始化渲染所有電影
renderMovies(movies);

// 搜尋功能
function filterMovies() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query)
    );
    renderMovies(filteredMovies);
}

// 註冊功能
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault(); // 防止表單提交刷新頁面

    const name = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const message = document.getElementById("registerMessage");

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ name, email, password }),
        redirect: "follow",
    };

    fetch(`${API_URL}/member/register`, requestOptions)
        .then((response) => {
            if (response.ok || response.created) {
                return response.json();
            } else {
                throw new Error("註冊失敗，請檢查資料！");
            }
        })
        .then((data) => {
            message.textContent = "註冊成功！";
            message.style.color = "green";
            document.getElementById("registerForm").reset();
        })
        .catch((error) => {
            message.textContent = error.message;
            message.style.color = "red";
        });
});

// 登入功能
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // 防止表單提交刷新頁面

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const message = document.getElementById("loginMessage");

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ email, password }),
        redirect: "follow",
    };

    fetch(`${API_URL}/member/login`, requestOptions)
        .then((response) => {
            if (response.ok || response.created) {
                return response.json();
            } else {
                throw new Error("登入失敗，請檢查帳號或密碼！");
            }
        })
        .then((data) => {
            message.textContent = `歡迎回來，${data.name}！`;
            message.style.color = "green";
            // 存儲 token 和會員 ID
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("currentMemberId", data.id); // 存儲會員 ID
            currentMemberId = data.id;
            isLoggedIn = true;
            // 顯示會員查詢功能
            document.getElementById('membershipMenu').style.display = 'block';
            document.getElementById('logoutButton').style.display = 'block'; // 顯示登出按鈕
            // 回到主畫面
            navigateTo('booking');
        })
        .catch((error) => {
            message.textContent = error.message;
            message.style.color = "red";
        });
});

// 初始化時檢查是否已登入
function checkLoginStatus() {
    const token = localStorage.getItem("authToken");
    const storedMemberId = localStorage.getItem("currentMemberId"); // 從 localStorage 獲取會員 ID
    if (token && storedMemberId) {
        isLoggedIn = true;
        currentMemberId = storedMemberId;
        document.getElementById('membershipMenu').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'block'; // 顯示登出按鈕
        fetchTicketHistory(currentMemberId);
    } else {
        isLoggedIn = false;
        document.getElementById('membershipMenu').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'none'; // 隱藏登出按鈕
    }
}

checkLoginStatus(); // 初始化檢查登入狀態

// 取得訂票歷史
async function fetchTicketHistory(memberId) {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_URL}/ticket/member/${memberId}`, requestOptions);
        const tickets = await response.json();
        console.log(tickets);
        renderTicketHistory(tickets["data"]);
    } catch (error) {
        console.error('Error fetching ticket history:', error);
    }
}

function renderTicketHistory(tickets) {
    const ticketList = document.getElementById('ticketList');
    ticketList.innerHTML = ''; // 清空列表

    tickets.sort((a, b) => new Date(b.purchaseTime) - new Date(a.purchaseTime)); // 按日期排序

    tickets.forEach(ticket => {
        const listItem = document.createElement('li');
        listItem.className = 'ticket-item';
        listItem.innerHTML = `
            <span>${ticket.id}</span>
            <span>${ticket.theaterName}</span>
            <span>${ticket.screenNumber}</span>
            <span>${ticket.date}</span>
            <span>${ticket.movieName}</span>
            <span>${ticket.startTime}</span>
            <span>${ticket.seatNumber}</span>
            <span>${ticket.price}</span>`;
        ticketList.appendChild(listItem);
    });
}

async function cancelSelectedTickets() {
    const checkboxes = document.querySelectorAll('.cancel-checkbox:checked');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer a974f9b8a917f49dd75168ff85072644");
    myHeaders.append("Content-Type", "application/json");

    const promises = Array.from(checkboxes).map(checkbox => {
        const ticketId = checkbox.getAttribute('data-id');
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        return fetch(`${API_URL}/ticket/${ticketId}`, requestOptions);
    });

    await Promise.all(promises);
    fetchTicketHistory(currentMemberId); // 重新取得訂票歷史
}

// 初始設定
function initialize() {
    checkLoginStatus();
    setupNavigation();
}

function setupNavigation() {
    // 切換頁面
    const navigateTo = (pageId) => {
        if (pageId === 'membership' && !isLoggedIn) {
            alert('請先登入');
            return;
        }
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        if (isLoggedIn) {
            document.getElementById('membershipMenu').style.display = 'block';
            document.getElementById('logoutButton').style.display = 'block';
        } else {
            document.getElementById('membershipMenu').style.display = 'none';
            document.getElementById('logoutButton').style.display = 'none';
        }
    };

    document.querySelectorAll('.sidebar button').forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('onclick').match(/'(.*)'/)[1];
            navigateTo(pageId);
        });
    });

    // 假設這是已登入會員的 ID
    currentMemberId = 1; // 這個值應該從登入狀態取得

    // 當點擊會員查詢時顯示訂票歷史
    document.querySelector('button[onclick="navigateTo(\'membership\')"]').addEventListener('click', () => {
        fetchTicketHistory(currentMemberId);
    });
}

// 登出功能
function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentMemberId");
    isLoggedIn = false;
    currentMemberId = null;
    checkLoginStatus();
    alert('已成功登出');
    navigateTo('booking'); // 回到主畫面
}

initialize(); // 初始化設定