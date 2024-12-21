
/* 會員資料 */
const MemberManage = document.getElementById('member-list');
const MemberData = [
    { id: "109590052",name: "黃士維",gender: "男",email:"t109590052@ntut.org.tw",password:"benson32618"},
    { id: "154561",name: "曾曾增",gender: "女",email:"t111111@ntut.org.tw",password:"aaaaa"}
];
/*
fetch('/api/members')
    .then(response => response.json())
    .then(memberdata => {
        memberdata.forEach(member =>{
            const Data = document.createElement('tr');
            Data.innerHTML = `
                <tr>
                    <td>${member.id}</td>
                    <td>${member.name}</td>
                    <td><span class="toggle-btn" onclick="toggleDetails(this)">Details</span></td>
                </tr>
                <tr class="details">
                    <td colspan="3">
                        <p><strong>Address:</strong>${member.gender}</p>
                        <p><strong>Phone:</strong>${member.email}</p>
                        <p><strong>Membership Date:</strong>${member.password}</p>
                    </td>
                </tr>
            `;
            MemberManage.appendChild(Data);
        });
    })
    .catch(error => {
        console.error('資料獲取失敗:',error);
    }
);
*/
/* 將資料植入網頁 */
function UpdataData(memData){
    MemberManage.innerHTML = "";
    memData.forEach(member =>{
        const Data = document.createElement('tr');
        Data.innerHTML = `
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td><span class="toggle-btn" onclick="toggleDetails(this)">View Details</span></td>
        `;
        MemberManage.appendChild(Data);
        const DataDetail = document.createElement('tr');
        DataDetail.classList.add('details')
        DataDetail.innerHTML = `
            <td colspan="3">
                <p><strong>Address:</strong>${member.gender}</p>
                <p><strong>Phone:</strong>${member.email}</p>
                <p><strong>Membership Date:</strong>${member.password}</p>
            </td>
        `;
        MemberManage.appendChild(DataDetail);
    });
    console.log("bbb");
}
UpdataData(MemberData);

function toggleDetails(button) {
    var detailsRow = button.closest('tr').nextElementSibling;
    if (detailsRow.style.display === 'table-row') {
        detailsRow.style.display = 'none';
        button.textContent = 'View Details';
    } else {
        detailsRow.style.display = 'table-row';
        button.textContent = 'Hide Details';
    }
}
