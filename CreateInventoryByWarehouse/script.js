// Khai báo các biến toàn cục
var searchBar={};
var table = {};
var options = {};
let totalRow = 0;

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
    options = {
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
            if (table && typeof table.setWhereQuery === 'function') table.setWhereQuery(obj.query);
        },
        onSearch: async (obj) => {
            console.log("Tìm kiếm: ", obj.query);
            if (table && typeof table.setWhereQuery === 'function') table.setWhereQuery(obj.query);
        },
        onEnter: async (obj) => {
            if (table && typeof table.setWhereQuery === 'function') table.setWhereQuery(obj.query);
        }
    };

    // Render SearchBar
    if (typeof SearchBar !== 'undefined') {
        searchBar = new SearchBar("#search", options);
    }
}

// 2. Cấu hình và render Table
async function renderTable() {
    option = {
        language: "vi", // Hoặc currentLanguage trong framework
        title: "",
        titleNoData: "Không có dữ liệu",
        hiddenButtonNoData: true,
        OrderBy: "Import_Date",
        maxRowInPage: 20,
        direction: "DESC",

        getData: {
            func: async (obj) => {
                let materialCode = "";
                let queryString = obj?.whereQuery || obj?.query || "";

                if (queryString) {
                    const match = queryString.match(/Material_Id\s+(?:LIKE|=)\s+'%?([^'%]+)%?'/i);
                    if (match && match[1]) {
                        materialCode = match[1].trim();
                    }
                }

                const bodyRequest = {
                    "MATERIAL_CODE": materialCode
                };

                console.log("Gọi API với body: ", bodyRequest);

                try {
                    const rs = await ajaxAwait("POST", "http://192.168.10.107:243/api/InventoryByMaterial", bodyRequest);
                    
                    // Kiểm tra response chuẩn theo format API 
                    if (rs?.code === 200 && Array.isArray(rs.data)) {
                        totalRow = rs.data.length;
                        
                        // Map dữ liệu từ API về đúng cấu trúc hiển thị của giao diện
                        return rs.data.map(item => {
                            let formattedDate = "";
                            if (item.RECEIPT_DATE) {
                                formattedDate = item.RECEIPT_DATE.split(" ")[0].replace(/-/g, "/");
                            }

                            return {
                                Barcode: item.LOT_NO || "",           
                                PO_Id: item.PO_NO || "",             
                                Material_Id: item.MATERIAL_CODE || "",
                                Material_Name: item.MATERIAL_NAME || "", 
                                Quantity: Number(item.QTY_STOCK || 0),
                                Unit: item.UNIT || "", 
                                Price: 0,                                             
                                Rack_Id: item.SHELF || "",          
                                Warehouse_Id: item.WAREHOUSE_CODE || "", 
                                Import_Date: formattedDate          
                            };
                        });
                    }

                    totalRow = 0;
                    return [];
                } catch (error) {
                    console.error("Lỗi hệ thống khi gọi API kiểm kê NVL:", error);
                    return [];
                }
            }
        },

        getPage: {
            func: async (obj) => {
                return totalRow;
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
    if (typeof TableView !== 'undefined') {
        table = new TableView("#table", option);
    } else {
        console.error("Không tìm thấy class TableView của thư viện htmlTable2!");
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

function ajaxAwait(method, url, body) {
    return new Promise((resolve, reject) => {
        $.ajax({
        type: method,
        url,
        headers: {
            // Authorization: "Bearer " + token,
        },
        data: JSON.stringify(body),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        cache: false,
        success: (data) => resolve(data),
        error: (xhr) => reject(xhr),
        });
    });
}
