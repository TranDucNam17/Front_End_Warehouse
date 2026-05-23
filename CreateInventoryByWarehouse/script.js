// Khai báo các biến toàn cục
let searchBar;
let tableInventory;
let optionSearch = {};
let optionTable = {};

// Khởi chạy các hàm theo chuẩn của project
if (typeof startFunc !== 'undefined') {
    startFunc['renderSearchBar'] = `renderSearchBar()`;
    startFunc['renderTable'] = `renderTable()`;
} else {
    // Tránh lỗi nếu chạy độc lập khi test nhanh
    $(document).ready(function() {
        renderSearchBar();
        renderTable();
    });
}

// 1. Cấu hình và render SearchBar
async function renderSearchBar() {
    optionSearch = {
        // language: $.i18n("keyLanguage"), // Tạm bỏ comment nếu có $.i18n
        language: "vi",
        queryFormat: "oracle",
        fields: [
            {
                table: "A",
                id: "PO_Id",
                title: "Số quản lý PO",
                dataField: "PO_Id",
                type: "input",
                compare: "LIKE"
            },
            {
                table: "A",
                id: "Material_Id",
                title: "Mã NVL",
                dataField: "Material_Id",
                type: "input",
                compare: "LIKE"
            },
            {
                table: "A",
                id: "Warehouse_Id",
                title: "Mã kho",
                dataField: "Warehouse_Id",
                type: "datalist", // Dạng select của MKAC
                compare: "=",
                onLoad: async (obj) => {
                    // Trả về mock options cho combobox
                    return [
                        { label: "PCB01", value: "PCB01" },
                        { label: "PCB02", value: "PCB02" },
                        { label: "WH03", value: "WH03" }
                    ];
                }
            },
            {
                table: "A",
                id: "Rack_Id",
                title: "Mã giá đỡ",
                dataField: "Rack_Id",
                type: "input",
                compare: "LIKE"
            },
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
            }
        ],
        
        onRefresh: async (obj) => {
            if (tableInventory) tableInventory.setWhereQuery(obj.query);
        },
        onSearch: async (obj) => {
            console.log("Tìm kiếm: ", obj.query);
            if (tableInventory) tableInventory.setWhereQuery(obj.query);
        },
        onEnter: async (obj) => {
            if (tableInventory) tableInventory.setWhereQuery(obj.query);
        }
    };

    // Render SearchBar
    if (typeof SearchBar !== 'undefined') {
        searchBar = new SearchBar("#searchbar", optionSearch);
    }
}

// 2. Cấu hình và render Table
async function renderTable() {
    optionTable = {
        language: "vi", // Hoặc currentLanguage trong framework
        title: "",
        titleNoData: "Không có dữ liệu",
        hiddenButtonNoData: true,
        OrderBy: "Import_Date",
        maxRowInPage: 20,
        direction: "DESC",

        getData: {
            func: async (obj) => {
                // Mock data hiển thị bảng
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
                        Rack_Id: "CLI-01", 
                        Warehouse_Id: "PCB01", 
                        Import_Date: "2026/01/01" 
                    });
                }
                return mockData;
            }
        },
        getPage: {
            func: async (obj) => {
                // Trả về tổng số bản ghi (Mock là 6)
                return 6;
            }
        },

        field: [
            { title: "Barcode", dataField: "Barcode", style: "min-width: 150px; text-align: center; font-weight: bold;" },
            { title: "Mã PO", dataField: "PO_Id", style: "min-width: 100px; text-align: center;" },
            { title: "Mã NVL", dataField: "Material_Id", style: "min-width: 100px; text-align: center; font-weight: bold;" },
            { title: "Tên NVL", dataField: "Material_Name", style: "min-width: 120px; text-align: center; font-weight: bold;" },
            { title: "Số lượng", dataField: "Quantity", style: "min-width: 80px; text-align: center; font-weight: bold;" },
            { title: "Đơn vị", dataField: "Unit", style: "min-width: 80px; text-align: center; font-weight: bold;" },
            { title: "Đơn giá", dataField: "Price", style: "min-width: 80px; text-align: right;" },
            { title: "Mã giá đỡ", dataField: "Rack_Id", style: "min-width: 100px; text-align: center; font-weight: bold;" },
            { title: "Mã kho", dataField: "Warehouse_Id", style: "min-width: 100px; text-align: center; font-weight: bold;" },
            { title: "Ngày nhập", dataField: "Import_Date", style: "min-width: 100px; text-align: center;" }
        ]
    };

    // Render HTML Table 2
    if (typeof Table !== 'undefined') {
        tableInventory = new Table("#inventoryTable", optionTable);
    }
}

// 3. Sự kiện riêng lẻ 
$(document).ready(function() {
    // Sự kiện checkbox Chọn tất cả
    $('#selectAllCheckbox').on('change', function() {
        console.log("Check all is: ", $(this).is(':checked'));
    });

    // Sự kiện nút Tạo kế hoạch
    $('#btnCreatePlan').on('click', function() {
        if(typeof mkacUI !== 'undefined' && mkacUI.Toast) {
             mkacUI.Toast.showToast("success", "Chức năng tạo kế hoạch kiểm kê sẽ gọi API tại đây!");
        } else {
             alert("Chức năng tạo kế hoạch kiểm kê sẽ gọi API tại đây!");
        }
    });
});
