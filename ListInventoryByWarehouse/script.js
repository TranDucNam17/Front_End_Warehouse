// Khai báo biến toàn cục
let searchBar;
let tableInventory;

// Đăng ký các hàm vào startFunc (Framework MKAC)
if (typeof startFunc !== 'undefined') {
    startFunc['renderSearchBar'] = `renderSearchBar()`;
    startFunc['renderTable'] = `renderTable()`;
    startFunc['renderPlanList'] = `renderPlanList()`;
} else {
    // Chạy độc lập nếu test nhanh
    $(document).ready(function() {
        renderSearchBar();
        renderTable();
        renderPlanList();
    });
}

// 1. Cấu hình SearchBar
async function renderSearchBar() {
    let optionSearch = {
        language: "vi",
        queryFormat: "oracle",
        fields: [
            {
                table: "A",
                id: "From_Date",
                title: "Ngày nhập từ",
                dataField: "Import_Date",
                type: "date",
                compare: ">="
            },
            {
                table: "A",
                id: "To_Date",
                title: "Ngày nhập đến",
                dataField: "Import_Date",
                type: "date",
                compare: "<="
            },
            {
                table: "A",
                id: "Search_Text",
                title: "",
                placeholder: "Nhập mã kế hoạch kiểm kê vào đây...",
                dataField: "Plan_Id",
                type: "input",
                compare: "LIKE"
            }
        ],
        onSearch: async (obj) => {
            console.log("Đã tìm kiếm: ", obj.query);
            if (tableInventory) tableInventory.setWhereQuery(obj.query);
        },
        onEnter: async (obj) => {
            if (tableInventory) tableInventory.setWhereQuery(obj.query);
        }
    };

    if (typeof SearchBar !== 'undefined') {
        searchBar = new SearchBar("#searchbar", optionSearch);
    }
}

// 2. Cấu hình Table
async function renderTable() {
    let optionTable = {
        language: "vi",
        title: "",
        titleNoData: "Không có dữ liệu",
        hiddenButtonNoData: true,
        OrderBy: "Barcode",
        maxRowInPage: 20,
        direction: "DESC",

        getData: {
            func: async (obj) => {
                let mockData = [];
                for(let i=0; i<6; i++) {
                    mockData.push({ 
                        Barcode: "2605P20311 01 0000 0001", 
                        PO_Id: "VA08-1234567", 
                        Material_Id: "1654654654", 
                        Material_Name: "NVL Chính", 
                        Quantity: 1000, 
                        Unit: "PCs", 
                        Price: 8.9, 
                        Rack_Id: "CLI-01"
                    });
                }
                return mockData;
            }
        },
        getPage: {
            func: async (obj) => {
                return 6;
            }
        },
        field: [
            { title: "Barcode", dataField: "Barcode", style: "min-width: 200px; text-align: center; font-weight: bold;" },
            { title: "Mã PO", dataField: "PO_Id", style: "min-width: 120px; text-align: center;" },
            { title: "Mã NVL", dataField: "Material_Id", style: "min-width: 120px; text-align: center; font-weight: bold;" },
            { title: "Tên NVL", dataField: "Material_Name", style: "min-width: 150px; text-align: center; font-weight: bold;" },
            { title: "Số lượng", dataField: "Quantity", style: "min-width: 100px; text-align: center; font-weight: bold;" },
            { title: "Đơn vị", dataField: "Unit", style: "min-width: 80px; text-align: center; font-weight: bold;" },
            { title: "Đơn giá", dataField: "Price", style: "min-width: 80px; text-align: right;" },
            { title: "Mã giá đỡ", dataField: "Rack_Id", style: "min-width: 120px; text-align: center; font-weight: bold;" }
        ]
    };

    if (typeof Table !== 'undefined') {
        tableInventory = new Table("#inventoryTable", optionTable);
    }
}

// 3. Render danh sách kế hoạch (cột trái)
async function renderPlanList() {
    let listHTML = "";
    
    // 5 cái xanh (hoàn thành)
    for(let i=0; i<5; i++) {
        listHTML += `<div class="plan-item bg-success-custom">Kế hoạch kiểm kê<br>2026/01/01</div>`;
    }
    // 3 cái đỏ (chưa hoàn thành)
    for(let i=0; i<3; i++) {
        listHTML += `<div class="plan-item bg-danger-custom">Kế hoạch kiểm kê<br>2026/01/01</div>`;
    }

    $("#planList").html(listHTML);
}

// Bắt sự kiện Trở lại
$(document).ready(function() {
    $('#btnBack').on('click', function() {
        console.log("Trở lại clicked!");
    });
});
