<?php
// Gọi file config chung để lấy các biến môi trường như $cdnServer
require_once __DIR__ . "/../../1.SourceCode/2.FrontEnd/config/config.php"; 
?>
<!-- Import jQuery (vì thư viện MKAC phụ thuộc jQuery) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.14.1/jquery-ui.min.js"></script>

<!-- Import thư viện SearchBar -->
<link href="<?php echo $cdnServer; ?>/lib/searchBarAll/v2/searchBarAll.css" type="text/css" rel="stylesheet">
<script src="<?php echo $cdnServer; ?>/lib/searchBarAll/v2/searchBarAll.js"></script>

<!-- Import thư viện Table2 -->
<!-- <script src="<?php echo $cdnServer; ?>/lib/htmlTable2/table.js"></script>
<link href="<?php echo $cdnServer; ?>/lib/htmlTable2/table.css" type="text/css" rel="stylesheet"> -->
<link href="http://192.184.1.112:3901/lib/htmlTable2/table.css" type="text/css" rel="stylesheet" />
<script src="http://192.184.1.112:3901/lib/htmlTable2/table.js"></script>

<div id="mkacui-root-layout">
  <div id="content-wrapper">
    <div id="content" class="mkacui-container-root mkacui-flex-y content" style="padding: 20px;">
        <div id="table1">
            
            <!-- Khu vực chứa form tìm kiếm (SearchBar render vào đây) -->
            <div id="searchbar">
                <div id="searchbar_content"></div>
            </div>
            
            <!-- Checkbox Chọn tất cả độc lập trên bảng -->
            <div style="margin: 15px 0;">
                <input type="checkbox" id="selectAllCheckbox" style="width: 18px; height: 18px; vertical-align: middle; border: 1px solid #777;">
            </div>

            <!-- Khu vực chứa bảng dữ liệu (Table2 render vào đây) -->
            <div id="inventoryTable"></div>
            
            <!-- Nút hành động Tạo kế hoạch kiểm kê -->
            <div style="text-align: right; margin-top: 20px;">
                <button id="btnCreatePlan" style="background-color: #4ac9ad; border: 1px solid #3eb49a; padding: 10px 24px; font-weight: bold; cursor: pointer;">
                    Tạo kế hoạch kiểm kê
                </button>
            </div>

        </div>
    </div>
  </div>
</div>

<link href="style.css" type="text/css" rel="stylesheet">
<script src="script.js"></script>
